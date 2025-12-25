import { Octokit } from '@octokit/rest';

/**
 * Create an authenticated Octokit client
 * @param accessToken - GitHub access token from NextAuth session
 */
export function createGitHubClient(accessToken: string) {
    return new Octokit({
        auth: accessToken,
    });
}

/**
 * Fetch events for a specific repository
 */
export async function fetchRepoEvents(
    octokit: Octokit,
    owner: string,
    repo: string,
    perPage: number = 30,
    since?: string
) {
    try {
        const { data } = await octokit.activity.listRepoEvents({
            owner,
            repo,
            per_page: perPage,
        });

        // Manual filter for Activity API which doesn't strictly support 'since'
        if (since) {
            const sinceDate = new Date(since);
            return data.filter((item) => item.created_at && new Date(item.created_at) >= sinceDate);
        }

        return data;
    } catch (error) {
        console.error(`Error fetching events for ${owner}/${repo}:`, error);
        throw error;
    }
}

/**
 * Fetch pull requests for a repository
 */
export async function fetchPullRequests(
    octokit: Octokit,
    owner: string,
    repo: string,
    state: 'open' | 'closed' | 'all' = 'all',
    since?: string
) {
    try {
        const { data } = await octokit.pulls.list({
            owner,
            repo,
            state,
            sort: 'updated',
            direction: 'desc',
            per_page: 20,
        });

        if (since) {
            const sinceDate = new Date(since);
            return data.filter((pr) => new Date(pr.updated_at) >= sinceDate);
        }

        return data;
    } catch (error) {
        console.error(`Error fetching PRs for ${owner}/${repo}:`, error);
        throw error;
    }
}

/**
 * Fetch issues for a repository
 */
export async function fetchIssues(
    octokit: Octokit,
    owner: string,
    repo: string,
    state: 'open' | 'closed' | 'all' = 'all',
    since?: string
) {
    try {
        const { data } = await octokit.issues.listForRepo({
            owner,
            repo,
            state,
            sort: 'updated',
            direction: 'desc',
            per_page: 20,
            since, // Natively supported
        });
        return data;
    } catch (error) {
        console.error(`Error fetching issues for ${owner}/${repo}:`, error);
        throw error;
    }
}

/**
 * Fetch workflow runs for a repository
 */
export async function fetchWorkflowRuns(
    octokit: Octokit,
    owner: string,
    repo: string,
    since?: string
) {
    try {
        const { data } = await octokit.actions.listWorkflowRunsForRepo({
            owner,
            repo,
            per_page: 20,
        });

        if (since) {
            const sinceDate = new Date(since);
            return data.workflow_runs.filter((run) => new Date(run.updated_at) >= sinceDate);
        }

        return data.workflow_runs;
    } catch (error) {
        console.error(`Error fetching workflow runs for ${owner}/${repo}:`, error);
        throw error;
    }
}

/**
 * Fetch user's accessible repositories
 */
export async function fetchUserRepos(octokit: Octokit) {
    try {
        const { data } = await octokit.repos.listForAuthenticatedUser({
            sort: 'updated',
            per_page: 100,
        });
        return data;
    } catch (error) {
        console.error('Error fetching user repos:', error);
        throw error;
    }
}
