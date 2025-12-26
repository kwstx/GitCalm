import { ProcessedEvent } from '../github/types';
import { interpretEvent } from '../ai/classifier';
import { generateLocalSummary } from '../ai/local_llm';
import { generateEventSummary } from '../ai/gemini';

/**
 * Server-side processor for GitHub data
 * Integrates AI classification for priority and impact analysis
 */
export async function processGitHubDataServer(rawData: any[]): Promise<ProcessedEvent[]> {
    const events: ProcessedEvent[] = [];

    for (const repoData of rawData) {
        const { repo, pullRequests, issues, workflows } = repoData;
        const repoName = repo.split('/')[1] || repo;

        // Process Pull Requests
        if (pullRequests) {
            for (const pr of pullRequests) {
                const isMerged = pr.merged_at !== null;

                // Prepare text for AI analysis
                // Limit body length to avoid excessive processing time
                const aiText = `Title: ${pr.title}. ${pr.body ? 'Description: ' + pr.body.substring(0, 200) : ''}`;

                // Get AI classification
                let aiResult;
                let geminiResult = null;
                const hasGemini = !!process.env.GEMINI_API_KEY;

                try {
                    // Hybrid Approach: Use logic/keywords for categorization (fast & consistent)
                    // Use LLM for "Human Summary" (rich & readable)

                    // 1. Fast Classification
                    aiResult = await interpretEvent(aiText);

                    // 2. Rich Summarization (if Key exists)
                    if (hasGemini) {
                        geminiResult = await generateEventSummary(pr.title, pr.body, 'pr');
                    }

                } catch (e) {
                    console.error(`[Processor] AI Failed for PR ${pr.number}:`, e);
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

                    // Override if urgent keywords exist (heuristic check as fallback/boost)
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
                    summary: geminiResult ? geminiResult.summary : `Pull request by ${pr.user.login}. ${aiResult.reason}`,
                    timestamp: pr.updated_at,
                    repo: repoName,
                    url: pr.html_url,
                    priority,
                    impact: geminiResult ? geminiResult.impact : impact,
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
                } catch (e) {
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
                    summary: `Issue by ${issue.user.login}. ${aiResult.reason}`,
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

                    const aiText = `Workflow Name: ${workflow.name}`;
                    // Optional: could allow AI to categorize the workflow type, but straightforward logic is usually enough here.

                    events.push({
                        id: `workflow-${workflow.id}`,
                        type: 'ci',
                        category: 'warning',
                        title: `CI Build Failed: ${workflow.name}`,
                        summary: `Workflow "${workflow.name}" failed on ${workflow.head_branch}.`,
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
