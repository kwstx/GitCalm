import { createGitHubClient, fetchRepoEvents, fetchPullRequests, fetchIssues, fetchWorkflowRuns, fetchUserRepos } from './client';

export function getGitHubService(accessToken: string) {
    const client = createGitHubClient(accessToken);

    return {
        /**
         * Fetch all repos for the user
         */
        getRepos: async () => {
            return await fetchUserRepos(client);
        },

        /**
         * Fetch all relevant data for a single repo in parallel
         */
        getRepoDetails: async (repoFullName: string) => {
            const [owner, repo] = repoFullName.split('/');

            // Parallel Fetch
            const [events, pullRequests, issues, workflows] = await Promise.all([
                fetchRepoEvents(client, owner, repo).catch(e => {
                    console.warn(`Failed to fetch events for ${repoFullName}`, e);
                    return [];
                }),
                fetchPullRequests(client, owner, repo, 'all').catch(e => {
                    // Warning: only 'all' state might result in huge payloads, but we limit per_page in client
                    console.warn(`Failed to fetch PRs for ${repoFullName}`, e);
                    return [];
                }),
                fetchIssues(client, owner, repo, 'all').catch(e => {
                    console.warn(`Failed to fetch issues for ${repoFullName}`, e);
                    return [];
                }),
                fetchWorkflowRuns(client, owner, repo).catch(e => {
                    console.warn(`Failed to fetch workflows for ${repoFullName}`, e);
                    return [];
                })
            ]);

            return {
                repo: repoFullName,
                events,
                pullRequests,
                issues,
                workflows
            };
        }
    };
}
