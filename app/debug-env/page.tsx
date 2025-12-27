export const dynamic = 'force-dynamic';

export default function DebugEnvPage() {
    const geminiKey = process.env.GEMINI_API_KEY;
    const hasKey = !!geminiKey && geminiKey.length > 5;

    return (
        <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
            <h1>Environment Debugger</h1>
            <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', background: '#f0f0f0' }}>
                <p><strong>GEMINI_API_KEY Status:</strong> {hasKey ? '✅ Present' : '❌ Missing'}</p>
                <p><strong>Key Length:</strong> {geminiKey ? geminiKey.length : 0}</p>
                <p><strong>First 4 chars:</strong> {geminiKey ? geminiKey.substring(0, 4) : 'N/A'}</p>
            </div>

            <p style={{ marginTop: '2rem', color: '#666' }}>
                Note: If this says "Missing", go to Vercel > Settings > Environment Variables and add "GEMINI_API_KEY".
                <br />
                Then go to Deployments > Redeploy.
            </p>
        </div>
    );
}
