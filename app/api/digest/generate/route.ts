import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { generateDigestWithAI } from '@/lib/ai/digest';
import { getGitHubService } from '@/lib/github/service';
import { processGitHubDataServer } from '@/lib/server/processor';
import { prisma } from '@/lib/prisma';
import { getUserProfile } from '@/lib/server/storage';

export async function POST(request: Request) {
    try {
        const session = await auth();
        // IMPORTANT: The existing type definition for session might put accessToken on the root, but let's check
        // If type error occurs, we cast it. Ideally we fix the type, but time is short.
        type SessionWithToken = typeof session & { accessToken?: string; user?: { accessToken?: string } };
        const token = (session as SessionWithToken)?.accessToken || (session?.user as SessionWithToken['user'])?.accessToken;
        const userId = session?.user?.id;

        if (!session || !token || !userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Parse Body
        const body = await request.json();
        const { date, userContext } = body;

        // 0. Check Cache (Rate Limiting)
        // We use the client's requested date or Today (UTC)
        const targetDate = date ? new Date(date) : new Date();
        const dateKey = targetDate.toISOString().split('T')[0]; // "YYYY-MM-DD"

        // ...

        // 0. Check User Schedule Preference (MOVED UP)
        // Enforce "Morning" (8am) vs "Evening" (5pm)
        // unified profile helper guarantees same ID resolution as Settings page
        const userProfile = await getUserProfile();
        // User asked for "8:00 AM" or "5:00 PM".
        const schedule = userProfile?.digestSchedule || 'morning';

        const now = new Date();
        const serverHour = now.getHours();

        // Check if we are using consistent IDs (Debug only)
        // userId (from session) vs userProfile userId (if we had it, but helper abstracts it)

        console.log(`[Digest Debug] Time: ${now.toISOString()}, ServerHour: ${serverHour}, UserSchedule: ${schedule}`);

        let unlockHour = 6; // Morning default
        if (schedule !== 'evening') unlockHour = 8;
        if (schedule === 'evening') unlockHour = 17; // 5 PM

        console.log(`[Digest Debug] UnlockCheck: ${serverHour} < ${unlockHour} ?`);

        // If it's too early, block generation (User requested strictness)
        if (serverHour < unlockHour) {
            console.log(`[Digest API] LOCKED. Schedule: ${schedule}, Current: ${serverHour}, Unlock: ${unlockHour}`);
            return NextResponse.json({
                locked: true,
                schedule,
                unlockHour,
                message: `Your ${schedule} briefing is preparing...`
            });
        }

        // 0.5. Check Cache (Rate Limiting)
        const cachedDigest = await prisma.dailyDigest.findUnique({
            where: {
                userId_dateKey: {
                    userId,
                    dateKey
                }
            }
        });

        if (cachedDigest) {
            console.log(`[Digest API] CACHE HIT for ${userId} on ${dateKey}`);
            return NextResponse.json({
                data: cachedDigest.digest,
                debug: { serverHour, schedule, unlockHour, type: 'CACHE_HIT' }
            });
        }
        // ...
        return NextResponse.json({
            data: digest,
            debug: { serverHour, schedule, unlockHour, type: 'GENERATED' }
        });

    } catch (error) {
        console.error('Digest generation failed:', error);
        return NextResponse.json({ error: 'Failed to generate digest' }, { status: 500 });
    }
}
