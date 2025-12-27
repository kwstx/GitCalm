import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { generateDigestWithAI } from '@/lib/ai/digest';
import { getGitHubService } from '@/lib/github/service';
import { processGitHubDataServer } from '@/lib/server/processor';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const session = await auth();
        // IMPORTANT: The existing type definition for session might put accessToken on the root, but let's check
        // If type error occurs, we cast it. Ideally we fix the type, but time is short.
        const token = (session as any)?.accessToken || (session?.user as any)?.accessToken;
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
            return NextResponse.json({ data: cachedDigest.digest });
        }

        console.log(`[Digest API] CACHE MISS for ${userId} on ${dateKey} - Generating...`);

        // 1. Fetch Real Events
        const service = getGitHubService(token);

        // Fetch User Repos (limit to 5 for performance)
        const repos = await service.getRepos();
        const repoNames = repos.slice(0, 5).map(r => r.full_name);

        // Fetch Events in Parallel
        const repoDataPromises = repoNames.map(async (repo) => {
            // In a real app we'd fetch specific events, here we reuse getRepoDetails or similar if optimized
            // But simpler: just fetch events endpoint for the repo if we had it.
            // Given existing tools: use service.getRepoDetails which fetches Events/PRs/Issues
            return service.getRepoDetails(repo);
        });

        const rawRepoData = await Promise.all(repoDataPromises);
        console.log(`[Digest API] Fetched data for ${rawRepoData.length} repos`);

        // 2. Process to standardized format (SERVER Processor)
        const processedEvents = await processGitHubDataServer(rawRepoData);
        console.log(`[Digest API] Processed ${processedEvents.length} total events`);

        // Filter by Date (Only "Today" or requested date range)
        const cutoff = new Date();
        cutoff.setHours(cutoff.getHours() - 24);

        const recentEvents = processedEvents.filter(e => new Date(e.timestamp) > cutoff);
        console.log(`[Digest API] Recent users events (24h): ${recentEvents.length}`);

        // 3. Smart Analysis (Local Engine)
        const digest = await generateDigestWithAI(recentEvents, userContext || 'Developer');

        // 4. Save to Cache
        if (digest && !digest.summary.startsWith('⚠️')) { // Don't cache errors
            await prisma.dailyDigest.create({
                data: {
                    userId,
                    dateKey,
                    digest: digest as any
                }
            });
            console.log(`[Digest API] Saved digest to cache.`);
        }

        return NextResponse.json({ data: digest });

    } catch (error) {
        console.error('Digest generation failed:', error);
        return NextResponse.json({ error: 'Failed to generate digest' }, { status: 500 });
    }
}
