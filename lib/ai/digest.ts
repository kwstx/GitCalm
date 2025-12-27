import { ProcessedEvent } from '../github/types';
import { generateDailyDigestAI } from './gemini';

export interface SmartDigest {
    summary: string;
    blockingIssues: { title: string; repo: string; id: string }[];
    quickWins: { title: string; repo: string; id: string }[];
    suggestedActions: { type: 'review' | 'reply' | 'fix'; label: string; url: string }[];
}

/**
 * Cloud-Only Smart Engine
 * 1. Tries to use Gemini (Cloud AI) for a rich, human-like summary.
 * 2. Returns error state if keys are missing or API fails (No Local Fallback).
 */
export async function generateDigestWithAI(events: ProcessedEvent[], role: string): Promise<SmartDigest> {

    // 1. Handle Empty Activity (Quiet Day)
    if (events.length === 0) {
        return {
            summary: "No activity detected in the last 24 hours. Enjoy the calm! ☕",
            blockingIssues: [],
            quickWins: [],
            suggestedActions: []
        };
    }

    // 2. Try Cloud AI
    try {
        const cloudDigest = await generateDailyDigestAI(events, role);
        if (cloudDigest) {
            console.log("Using Cloud AI Digest");
            return cloudDigest;
        }
    } catch (e: any) {
        console.error("Cloud digest failed:", e);
        return {
            summary: `⚠️ AI Generation Failed: ${e.message || 'Unknown error'}. (Model: gemini-1.5-flash-001)`,
            blockingIssues: [],
            quickWins: [],
            suggestedActions: []
        };
    }

    // 2. Fallback (Should not reach here if throw works, but just in case)
    return {
        summary: "Unable to generate AI digest. Unknown error occurred.",
        blockingIssues: [],
        quickWins: [],
        suggestedActions: []
    };
}
