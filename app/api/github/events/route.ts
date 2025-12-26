import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createGitHubClient, fetchRepoEvents, fetchPullRequests, fetchIssues, fetchWorkflowRuns, fetchLastFailure } from '@/lib/github/client';
import { processGitHubDataServer } from '@/lib/server/processor';

export async function POST(request: Request) {
    try {
        const session = await auth();
        console.log('[API] /api/github/events called');

        if (!session?.accessToken) {
            return NextResponse.json(
                { error: 'Unauthorized: No access token found.' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { repos, startDate } = body;

        if (!repos || !Array.isArray(repos)) {
            return NextResponse.json(
                { error: 'Invalid request: repos array required' },
                { status: 400 }
            );
        }

        const octokit = createGitHubClient(session.accessToken as string);

        // Fetch events AND failure history for each repository
        const repoPromises = repos.map(async (repoFullName: string) => {
            const [owner, repo] = repoFullName.split('/');
            if (!owner || !repo) return null;

            try {
                // Fetch digest data AND the last known failure (for streak)
                const [events, prs, issues, workflows, lastFailure] = await Promise.all([
                    fetchRepoEvents(octokit, owner, repo, 30, startDate),
                    fetchPullRequests(octokit, owner, repo, 'all', startDate),
                    fetchIssues(octokit, owner, repo, 'all', startDate),
                    fetchWorkflowRuns(octokit, owner, repo, startDate).catch(() => []),
                    fetchLastFailure(octokit, owner, repo).catch(() => null), // Independent catch
                ]);

                return {
                    repo: repoFullName,
                    events,
                    pullRequests: prs,
                    issues,
                    workflows,
                    lastFailure, // String ISO date or null
                };
            } catch (error) {
                console.error(`Error fetching data for ${repoFullName}:`, error);
                return null;
            }
        });

        const results = (await Promise.all(repoPromises)).filter((r) => r !== null) as any[];

        // --- Calculate Global Streak ---
        let mostRecentFailureTime = 0;

        results.forEach(r => {
            if (r.lastFailure) {
                const failureTime = new Date(r.lastFailure).getTime();
                if (failureTime > mostRecentFailureTime) {
                    mostRecentFailureTime = failureTime;
                }
            }
        });

        const now = Date.now();
        let streakDays = 7; // Default "Good" state if no failures found

        if (mostRecentFailureTime > 0) {
            const diffTime = Math.abs(now - mostRecentFailureTime);
            streakDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        } else {
            // Signal "No Failures Found" with -1 (Perfect Streak)
            streakDays = -1;
        }

        // Process events server-side
        console.log('[API] Starting server-side processing...');
        let processedEvents: any[] = []; // Explicitly typed to allow assignment
        try {
            processedEvents = await processGitHubDataServer(results);
            console.log('[API] Processing complete.');
        } catch (procError) {
            console.error('[API] Processing failed:', procError);
        }

        // Return both events and the calculated streak
        return NextResponse.json({
            data: processedEvents,
            streak: streakDays
        });

    } catch (error) {
        console.error('CRITICAL Error in /api/github/events:', error);
        // Return 500 but with JSON body so frontend doesn't just hang
        return NextResponse.json(
            { error: 'Internal Server Error: Failed to process events', details: String(error) },
            { status: 500 }
        );
    }
}
