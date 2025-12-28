import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini Client
// We use the "gemini-1.5-flash" model as it's fast, efficient, and free-tier eligible.
// Sanitize Key: Remove quotes and whitespace
const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.replace(/['"]/g, '').trim() : '';
console.log(`[Gemini Init] Key present: ${!!apiKey}, Length: ${apiKey?.length || 0}`);
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Rate Limiter: STRICT Free Tier Safety
// - Free Tier Limit: 15 RPM
// - Our Limit: 5 RPM (Very conservative to avoid ANY billing/errors)
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 5;
let requestCount = 0;
let windowStart = Date.now();

function checkRateLimit(): boolean {
    const now = Date.now();
    if (now - windowStart > RATE_LIMIT_WINDOW) {
        // Reset window
        windowStart = now;
        requestCount = 0;
    }

    if (requestCount >= MAX_REQUESTS) {
        return false;
    }

    requestCount++;
    return true;
}

export async function generateEventSummary(title: string, body: string, type: 'pr' | 'issue'): Promise<{ summary: string; impact: string }> {
    if (!genAI) {
        // Silent fail if no key, no error for user
        return { summary: title, impact: "Update" };
    }

    // STRICT LIMIT: If we hit our internal cap, skip AI immediately.
    if (!checkRateLimit()) {
        console.warn("[Gemini] Internal Rate Limit Hit. Skipping AI summary.");
        return {
            summary: title, // Fallback to original title
            impact: "Update"
        };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
    You are an expert engineering manager. Summarize this GitHub ${type} for a daily executive digest.
    
    Input:
    Title: ${title}
    Body: ${body || "No description provided."}
    
    Requirements:
    1. Summary: A single, punchy sentence explaining the *value* or *change* (not just repeating the title). Max 20 words.
    2. Impact: A strict 2-3 word tag describing the business/technical impact (e.g. "Performance Boost", "Security Fix", "Tech Debt", "New Feature").
    
    Output JSON format only:
    {
      "summary": "...",
      "impact": "..."
    }
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        // Clean up markdown block if present
        const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini Generation Failed:", error);
        return {
            summary: title,
            impact: "Update"
        };
    }
}

/**
 * Generate a comprehensive daily digest using Gemini
 */
import { ProcessedEvent } from '../github/types';
import { SmartDigest } from './digest';

export async function generateDailyDigestAI(events: ProcessedEvent[], role: string): Promise<SmartDigest | null> {
    if (!genAI || events.length === 0) return null;

    if (!checkRateLimit()) {
        console.warn("[Gemini] Internal Rate Limit Hit. Skipping AI Digest.");
        return null; // Fallback to local engine
    }

    // Use generic Flash latest (Best chance of quota)
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    // Simplification: only send titles and categories to save tokens
    const eventsList = events.map(e => `- [${e.category}] ${e.repo}: ${e.title} (${e.impact || 'update'})`).join('\n');

    const prompt = `
    You are an expert engineering manager active as a ${role}. 
    Analyze this list of GitHub activity and generate a concise daily briefing.
    
    Activity Log:
    ${eventsList}
    
    Requirements:
    1. Summary: A friendly, professional paragraph (max 40 words) summarizing the day's vibe (e.g. "High velocity day with 3 key feature ships..." or "Quiet day mostly focused on maintenance...").
    2. Blocking Issues: Identify up to 3 apparent blockers or critical failures.
    3. Quick Wins: Identify up to 3 successes (merged PRs).
    4. Suggested Actions: Recommend 2 specific follow-up actions (e.g. "Review PR #123", "Fix build in backend").
    
    Output JSON format only:
    {
      "summary": "...",
      "blockingIssues": [ { "title": "...", "repo": "...", "id": "placeholder" } ],
      "quickWins": [ { "title": "...", "repo": "...", "id": "placeholder" } ],
      "suggestedActions": [ { "type": "review|reply|fix", "label": "...", "url": "#" } ]
    }
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini Digest Generation Failed:", error);
        throw error; // Throw so we can report it to the user
    }
}

