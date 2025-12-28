import { NextResponse } from 'next/server';
import { getUserProfile, saveUserProfile } from '@/lib/server/storage';

export async function GET() {
    try {
        const profile = await getUserProfile();
        return NextResponse.json(profile);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}


import { z } from 'zod';

const ProfileSchema = z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
    goals: z.array(z.string()).optional(),
    focusAreas: z.array(z.string()).optional(),
    onboardingCompleted: z.boolean().optional(),
    minimalistMode: z.boolean().optional()
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Input Validation
        const result = ProfileSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: 'Invalid input', details: result.error.format() }, { status: 400 });
        }

        const updatedProfile = await saveUserProfile(result.data);
        return NextResponse.json(updatedProfile);
    } catch {
        return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 });
    }
}
