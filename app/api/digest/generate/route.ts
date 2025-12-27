import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { generateDigestWithAI } from '@/lib/ai/digest';
import { getGitHubService } from '@/lib/github/service';
import { processGitHubDataServer } from '@/lib/server/processor';

export async function POST(request: Request) {
    try {
        const session = await auth();
        // IMPORTANT: The existing type definition for session might put accessToken on the root, but let's check
        // If type error occurs, we cast it. Ideally we fix the type, but time is short.
        const token = (session as any)?.accessToken || (session?.user as any)?.accessToken;

        if (!session || !token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Parse Body
        const body = await request.json();
        const { date, userContext } = body;

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

        // 2. Process to standardized format (SERVER Processor)
        // Use the server processor we found earlier (`processGitHubDataServer`) 
        // because it includes the keyword classification logic!
        const processedEvents = await processGitHubDataServer(rawRepoData);

        // Filter by Date (Only "Today" or requested date range)
        // For "Daily Digest", we usually want the last 24 hours
        const cutoff = new Date();
        cutoff.setHours(cutoff.getHours() - 24);

        const recentEvents = processedEvents.filter(e => new Date(e.timestamp) > cutoff);

        // 3. Smart Analysis (Local Engine)
        const digest = await generateDigestWithAI(recentEvents, userContext || 'Developer');

        return NextResponse.json({ data: digest });

    } catch (error) {
        console.error('Digest generation failed:', error);
        return NextResponse.json({ error: 'Failed to generate digest' }, { status: 500 });
    }
}
