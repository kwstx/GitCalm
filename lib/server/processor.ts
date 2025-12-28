import { ProcessedEvent } from '../github/types';
import { interpretEvent } from '../ai/classifier';
// import { generateEventSummary } from '../ai/gemini'; // Replaced by Daily Digest AI

/**
 * Server-side processor for GitHub data
 * Integrates AI classification and Gemini Summarization
 */
interface GitHubUser {
    login: string;
}

interface GitHubPR {
    id: number;
    number: number;
    title: string;
    body?: string | null;
    merged_at: string | null;
    html_url: string;
    user: GitHubUser | null;
    updated_at: string;
}

interface GitHubIssue {
    id: number;
    number: number;
    title: string;
    body?: string | null;
    state: string;
    html_url: string;
    user: GitHubUser | null;
    updated_at: string;
    pull_request?: unknown;
}

interface GitHubWorkflowRun {
    id: number;
    name?: string | null;
    conclusion: string | null;
    head_branch: string | null;
    html_url: string;
    updated_at: string;
}

interface GitHubEventNative {
    id: string;
    type: string | null;
    created_at: string | null;
    actor: {
        login: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
}

export interface RepoData {
    repo: string;
    pullRequests?: GitHubPR[];
    issues?: GitHubIssue[];
    workflows?: GitHubWorkflowRun[];
    events?: GitHubEventNative[];
    lastFailure?: string | null;
}

export async function processGitHubDataServer(rawData: RepoData[]): Promise<ProcessedEvent[]> {
    const events: ProcessedEvent[] = [];

    for (const repoData of rawData) {
        const { repo, pullRequests, issues, workflows, events: rawEvents } = repoData;
        const repoName = repo.split('/')[1] || repo;

        // Process Direct Commits (PushEvents)
        // Ideally we only show these if they aren't part of a PR, but for now show all to ensure visibility.
        if (rawEvents) {
            for (const event of rawEvents) {
                if (event.type === 'PushEvent') {
                    const commitCount = event.payload.size || 1;
                    const branch = event.payload.ref?.replace('refs/heads/', '') || 'unknown';
                    const message = event.payload.commits?.[0]?.message || 'Pushed code';

                    // Skip bots
                    if (event.actor.login.includes('[bot]')) continue;

                    events.push({
                        id: `push-${event.id}`,
                        type: 'commit',
                        category: 'info',
                        title: `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${branch}`,
                        summary: `Latest: "${message.split('\n')[0]}"`,
                        timestamp: event.created_at || new Date().toISOString(),
                        repo: repoName,
                        url: `https://github.com/${repo}/commits/${branch}`, // Approximate link
                        priority: 'low',
                        impact: 'Code Update',
                        priorityReason: 'Direct commit to branch'
                    });
                }
            }
        }

        // Process Pull Requests
        if (pullRequests) {
            for (const pr of pullRequests) {
                const isMerged = pr.merged_at !== null;

                // Prepare text for AI analysis
                const aiText = `Title: ${pr.title}. ${pr.body ? 'Description: ' + pr.body.substring(0, 200) : ''}`;

                // Get AI classification
                let aiResult: { label: string; score: number; reason: string };


                try {
                    // 1. Fast Classification
                    aiResult = await interpretEvent(aiText);


                    // 2. Gemini AI Summarization (REMOVED: Per-event summarization disabled to focus AI tokens on Daily Digest)
                    // if (hasGemini && (isMerged || aiResult.score > 0.8)) {
                    //    summaryResult = await generateEventSummary(pr.title, pr.body, 'pr');
                    // }

                } catch {
                    console.error(`[Processor] AI Failed for PR ${pr.number}`);
                    aiResult = {
                        label: 'general update',
                        score: 0,
                        reason: 'AI classification unavailable (Error)'
                    };
                }

                // Determine category and base priority
                let category: 'success' | 'warning' | 'info' = 'info';
                let priority: 'high' | 'medium' | 'low' = 'medium';
                let impact: string | undefined = undefined;

                if (isMerged) {
                    category = 'success';
                    impact = 'Shipped';
                    priority = 'low';
                } else {
                    // Open PR logic enriched by AI
                    if (aiResult.label === 'security fix') {
                        priority = 'high';
                        category = 'warning';
                        impact = 'Security Patch';
                    } else if (aiResult.label === 'bug fix') {
                        priority = 'medium';
                        category = 'warning';
                        impact = 'Bug Fix';
                    } else if (aiResult.label === 'new feature') {
                        priority = 'medium';
                        impact = 'Feature';
                    } else {
                        // Default info
                        priority = 'low';
                    }

                    // Override if urgent keywords exist
                    if (pr.title.toLowerCase().includes('urgent') || pr.title.toLowerCase().includes('hotfix')) {
                        priority = 'high';
                        category = 'warning';
                        aiResult.reason += ' (Detected urgent keywords)';
                    }
                }

                events.push({
                    id: `pr-${pr.id}`,
                    type: 'pr',
                    category,
                    title: isMerged
                        ? `PR #${pr.number} merged: ${pr.title}`
                        : `PR #${pr.number}: ${pr.title}`,
                    // Use heuristic fallback only
                    summary: `Pull request by ${pr.user?.login || 'unknown'}. ${aiResult.reason}`,
                    timestamp: pr.updated_at,
                    repo: repoName,
                    url: pr.html_url,
                    priority,
                    // Use heuristic fallback only
                    impact: impact,
                    priorityReason: aiResult.reason,
                });
            }
        }

        // Process Issues
        if (issues) {
            for (const issue of issues) {
                // Skip pull requests
                if (issue.pull_request) continue;

                const isClosed = issue.state === 'closed';

                const aiText = `Issue Title: ${issue.title}. ${issue.body ? 'Content: ' + issue.body.substring(0, 200) : ''}`;
                let aiResult;
                try {
                    aiResult = await interpretEvent(aiText);
                } catch {
                    aiResult = {
                        label: 'general update',
                        score: 0,
                        reason: 'AI classification unavailable'
                    };
                }

                let priority: 'high' | 'medium' | 'low' = 'medium';

                if (aiResult.label === 'security fix' || aiResult.label === 'build failure') {
                    priority = 'high';
                } else if (isClosed) {
                    priority = 'low';
                }

                events.push({
                    id: `issue-${issue.id}`,
                    type: 'issue',
                    category: 'info',
                    title: `Issue #${issue.number}: ${issue.title}`,
                    summary: `Issue by ${issue.user?.login || 'unknown'}. ${aiResult.reason}`,
                    timestamp: issue.updated_at,
                    repo: repoName,
                    url: issue.html_url,
                    priority,
                    priorityReason: aiResult.reason,
                });
            }
        }

        // Process Workflow Runs
        if (workflows) {
            for (const workflow of workflows) {
                const failed = workflow.conclusion === 'failure';

                if (failed) {
                    // For workflows, we generally don't need deep AI analysis of the text 
                    // because the status is the most important signal.
                    // But we can check the name to see if it's a "Security Scan" or "Deploy".


                    // Optional: could allow AI to categorize the workflow type, but straightforward logic is usually enough here.

                    events.push({
                        id: `workflow-${workflow.id}`,
                        type: 'ci',
                        category: 'warning',
                        title: `CI Build Failed: ${workflow.name || 'Unknown Workflow'}`,
                        summary: `Workflow "${workflow.name || 'Unknown'}" failed on ${workflow.head_branch || 'unknown branch'}.`,
                        timestamp: workflow.updated_at,
                        repo: repoName,
                        url: workflow.html_url,
                        priority: 'high',
                        impact: 'Blocking Deploy',
                        priorityReason: 'CI workflow failed on default branch',
                    });
                }
            }
        }
    }

    // Sort by timestamp (newest first)
    events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return events;
}
