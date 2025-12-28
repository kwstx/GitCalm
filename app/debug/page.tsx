'use client';
import { useState, useEffect } from 'react';

export default function DebugPage() {
    const [status, setStatus] = useState('Initializing...');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [profile, setProfile] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [events, setEvents] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        runDiagnostics();
    }, []);

    const runDiagnostics = async () => {
        try {
            setStatus('1. Fetching User Profile...');
            const profileRes = await fetch('/api/user/profile');
            if (!profileRes.ok) throw new Error(`Profile Fetch Failed: ${profileRes.status}`);
            const profileData = await profileRes.json();
            setProfile(profileData);

            setStatus('2. Checking Selected Repos...');
            if (!profileData.selectedRepos || profileData.selectedRepos.length === 0) {
                setStatus('ERROR: No repositories selected in profile database.');
                return;
            }

            setStatus(`3. Fetching Events for [${profileData.selectedRepos.join(', ')}]...`);

            // Debug Loop
            const debugResults = [];
            for (const repoName of profileData.selectedRepos) {
                if (!repoName.includes('/')) {
                    debugResults.push(`⚠️ Invalid Repo Name ignored: ${repoName}`);
                    continue;
                }
                const [owner, repo] = repoName.split('/');
                debugResults.push(`Checking ${owner}/${repo}...`);
            }

            const eventsRes = await fetch('/api/github/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    repos: profileData.selectedRepos,
                    // Use a massively long window to guarantee we find *something*
                    startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
                })
            });

            if (!eventsRes.ok) {
                const errText = await eventsRes.text();
                throw new Error(`Events API Failed (${eventsRes.status}): ${errText}`);
            }

            const eventsData = await eventsRes.json();
            setEvents(eventsData);
            setStatus('SUCCESS: Data fetched completely.');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            console.error(e);
            setError(e.message || String(e));
            setStatus('FAILED: Diagnostics stopped due to error.');
        }
    };

    return (
        <div style={{ padding: '40px', fontFamily: 'monospace', background: '#000', color: '#0f0', minHeight: '100vh' }}>
            <h1>System Diagnostics</h1>
            <h2 style={{ color: error ? 'red' : 'white' }}>Status: {status}</h2>

            {error && (
                <div style={{ border: '1px solid red', padding: '20px', margin: '20px 0', color: 'red' }}>
                    <h3>CRITICAL ERROR:</h3>
                    <pre>{error}</pre>
                </div>
            )}

            <h3>User Profile Data:</h3>
            <pre>{JSON.stringify(profile, null, 2)}</pre>

            <h3>Events Data Response:</h3>
            <pre>{JSON.stringify(events, null, 2)}</pre>
        </div>
    );
}
