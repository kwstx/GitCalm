'use client';
import { useState, useEffect } from 'react';

export default function DebugPage() {
    const [status, setStatus] = useState('Initializing...');
    const [profile, setProfile] = useState<any>(null);
    const [events, setEvents] = useState<any>(null);
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
            const eventsRes = await fetch('/api/github/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    repos: profileData.selectedRepos,
                    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
                })
            });

            if (!eventsRes.ok) {
                const errText = await eventsRes.text();
                throw new Error(`Events API Failed (${eventsRes.status}): ${errText}`);
            }

            const eventsData = await eventsRes.json();
            setEvents(eventsData);
            setStatus('SUCCESS: Data fetched completely.');

        } catch (err: any) {
            console.error(err);
            setError(err.message || String(err));
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
