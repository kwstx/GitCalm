import { GoogleGenerativeAI } from "@google/generative-ai";

export const dynamic = 'force-dynamic';

export default async function DebugEnvPage() {
    // Sanitize Key
    const rawKey = process.env.GEMINI_API_KEY;
    const apiKey = rawKey ? rawKey.replace(/['"]/g, '').trim() : '';

    const results = [];

    if (apiKey) {
        const genAI = new GoogleGenerativeAI(apiKey);

        // Test 1: Gemini 1.5 Flash (SDK)
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent("Say 'Flash OK'");
            results.push({ model: "gemini-1.5-flash (SDK)", status: "✅ Success", details: result.response.text() });
        } catch (e: any) {
            results.push({ model: "gemini-1.5-flash (SDK)", status: "❌ Failed", details: e.message });
        }

        // Test 2: Gemini Pro (SDK)
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent("Say 'Pro OK'");
            results.push({ model: "gemini-pro (SDK)", status: "✅ Success", details: result.response.text() });
        } catch (e: any) {
            results.push({ model: "gemini-pro (SDK)", status: "❌ Failed", details: e.message });
        }

        // Test 3: Raw REST API (No SDK)
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: "Say 'REST OK'" }] }] })
            });
            const data = await response.json();
            if (response.ok) {
                results.push({ model: "gemini-1.5-flash (Raw FETCH)", status: "✅ Success", details: JSON.stringify(data, null, 2) });
            } else {
                results.push({ model: "gemini-1.5-flash (Raw FETCH)", status: "❌ Failed (" + response.status + ")", details: JSON.stringify(data, null, 2) });
            }
        } catch (e: any) {
            results.push({ model: "gemini-1.5-flash (Raw FETCH)", status: "❌ Network Error", details: e.message });
        }

        // Test 4: List Models (Discovery)
        try {
            const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
            const response = await fetch(listUrl);
            const data = await response.json();
            if (response.ok) {
                const modelNames = data.models?.map((m: any) => m.name) || [];
                const display = modelNames.length > 0 ? modelNames.join('\n') : "No models found in list.";
                results.push({ model: "ListModels API", status: "✅ Success", details: display });
            } else {
                results.push({ model: "ListModels API", status: "❌ Failed (" + response.status + ")", details: JSON.stringify(data, null, 2) });
            }
        } catch (e: any) {
            results.push({ model: "ListModels API", status: "❌ Network Error", details: e.message });
        }

    } else {
        results.push({ model: "N/A", status: "Skipped", details: "No API Key found" });
    }

    return (
        <div style={{ padding: '2rem', fontFamily: 'monospace', maxWidth: '800px', margin: '0 auto' }}>
            <h1>🛡️ API Diagnostic</h1>

            <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h3>Environmental Variable</h3>
                <p><strong>Status:</strong> {apiKey ? '✅ Present' : '❌ Missing'}</p>
                <p><strong>Length:</strong> {apiKey ? apiKey.length : 0} chars</p>
                <p><strong>Prefix:</strong> {apiKey ? apiKey.substring(0, 4) : 'N/A'}</p>
                <p><strong>Sanitized:</strong> {rawKey !== apiKey ? '⚠️ Yes (Quotes removed)' : 'No (Clean)'}</p>
            </div>

            <h3>Model Connectivity Tests</h3>
            {results.map((res, i) => (
                <div key={i} style={{
                    marginBottom: '1rem',
                    padding: '1rem',
                    background: res.status.includes('Success') ? '#f0fdf4' : '#fef2f2',
                    border: `1px solid ${res.status.includes('Success') ? '#bbf7d0' : '#fecaca'}`,
                    borderRadius: '8px'
                }}>
                    <h4>{res.model}</h4>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{res.status}</div>
                    <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', overflowX: 'auto' }}>
                        {res.details}
                    </pre>
                </div>
            ))}

            <p style={{ marginTop: '2rem', color: '#666', fontSize: '0.9rem' }}>
                Refreshes on every page load.
            </p>
        </div>
    );
}
