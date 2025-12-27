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

    // 1. Try Cloud AI
    try {
        const cloudDigest = await generateDailyDigestAI(events, role);
        if (cloudDigest) {
            console.log("Using Cloud AI Digest");
            return cloudDigest;
        }
    } catch (e) {
        console.error("Cloud digest failed:", e);
    }

    // 2. Cloud Failed: Return "Service Unavailable" state (No Local Fallback)
    console.warn("Cloud AI unavailable and local fallback is disabled.");

    return {
        summary: "Unable to generate AI digest. Please ensure your GEMINI_API_KEY is configured correctly in Vercel.",
        blockingIssues: [],
        quickWins: [],
        suggestedActions: []
    };
}

