'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function DailyBriefingPage() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [digest, setDigest] = useState<any>(null);
    const [lockedState, setLockedState] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Initial Load - Check Cache/Generate
    useEffect(() => {
        if (status === 'authenticated' && session) {
            fetchDigest();
        }
    }, [status, session]);

    const fetchDigest = async () => {
        setLoading(true);
        setError(null);
        setLockedState(null);
        try {
            console.log("Fetching digest...");
            const today = new Date().toISOString().split('T')[0];
            const response = await fetch('/api/digest/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: today,
                    userContext: 'Engineering Lead' // Or pull from profile
                })
            });
            const data = await response.json();
            console.log("Digest data:", data);

            if (data.locked) {
                setLockedState(data);
                setLoading(false);
                return;
            }

            if (data.error) throw new Error(data.error);
            setDigest(data.data);
        } catch (err: any) {
            console.error("Fetch error:", err);
            setError(err.message || "Failed to load briefing");
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading') {
        return <div style={{ padding: '6rem', textAlign: 'center', color: '#94a3b8', fontFamily: 'serif', fontStyle: 'italic' }}>Loading daily briefing...</div>;
    }

    if (status === 'unauthenticated' || !session) {
        return <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>Please log in to view your briefing.</div>;
    }

    // LOCKED STATE (Too Early)
    if (lockedState) {
        return (
            <div style={{ maxWidth: '800px', margin: '4rem auto', textAlign: 'center', fontFamily: 'var(--font-geist-sans)' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>☕</div>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', fontFamily: 'serif' }}>Good {lockedState.schedule === 'morning' ? 'Morning' : 'Afternoon'}, {session.user?.name?.split(' ')[0] || 'User'}.</h2>
                <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '500px', margin: '0 auto 2rem' }}>
                    Your {lockedState.schedule} briefing is being prepared. It will be available at <strong>{lockedState.unlockHour > 12 ? `${lockedState.unlockHour - 12} PM` : `${lockedState.unlockHour} AM`}</strong>.
                </p>
                <div style={{
                    padding: '1rem',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    display: 'inline-block',
                    fontSize: '0.9rem',
                    color: '#94a3b8'
                }}>
                    Current time: {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </div>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '3rem 2rem',
            fontFamily: 'var(--font-geist-sans), sans-serif',
            color: '#1e293b'
        }}>

            {/* Newspaper Header */}
            <header style={{
                borderBottom: '4px double #e2e8f0',
                paddingBottom: '2rem',
                marginBottom: '3rem',
                textAlign: 'center'
            }}>
                <div style={{
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#64748b',
                    fontSize: '0.875rem',
                    marginBottom: '1rem',
                    fontWeight: 600
                }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    fontFamily: '"Playfair Display", Georgia, serif', // Fallback to serif
                    marginBottom: '0',
                    lineHeight: 1.1
                }}>
                    The Daily Briefing
                </h1>
                <div style={{ marginTop: '1rem', fontSize: '1.1rem', color: '#475569', fontStyle: 'italic', fontFamily: 'serif' }}>
                    Prepared for {session.user?.name || 'Engineering Team'}
                </div>
            </header>

            {/* Error State */}
            {error && (
                <div style={{ padding: '1rem', background: '#fef2f2', color: '#ef4444', borderRadius: '12px', marginBottom: '2rem' }}>
                    ⚠️ {error} <button onClick={fetchDigest} style={{ textDecoration: 'underline', marginLeft: '1rem' }}>Retry</button>
                </div>
            )}

            {/* Loading State */}
            {loading && !digest && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', padding: '6rem 0', color: '#94a3b8' }}>
                    <div className="spinner" style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTopColor: '#0f172a', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    <p style={{ marginTop: '1rem', fontFamily: 'serif', fontSize: '1.1rem' }}>Analyzing yesterday's activity...</p>
                    <style jsx>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            )}

            {/* Content State */}
            {digest && (
                <div style={{ animation: 'fadeIn 0.7s ease-out' }}>
                    <style jsx>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>

                    {/* Main Layout: 2 Columns (Main Story + Sidebar Columns) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>

                        {/* LEFT COLUMN: Executive Summary (The "Main Story") */}
                        <div>
                            <div style={{
                                fontSize: '1.25rem',
                                lineHeight: '1.8',
                                color: '#334155',
                                fontFamily: '"Georgia", serif',
                                borderBottom: '1px solid #e2e8f0',
                                paddingBottom: '2rem',
                                marginBottom: '2rem'
                            }}>
                                {digest.summary}
                            </div>

                            {/* Action Plan (The "What to do") */}
                            <h3 style={{ fontSize: '1.5rem', fontFamily: 'serif', fontWeight: 700, marginBottom: '1.5rem', borderLeft: '4px solid #3b82f6', paddingLeft: '1rem' }}>
                                Today's Agenda
                            </h3>
                            {digest.suggestedActions.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {digest.suggestedActions.map((action: any, i: number) => (
                                        <li key={i} style={{
                                            padding: '1rem',
                                            background: '#f8fafc',
                                            borderRadius: '8px',
                                            marginBottom: '1rem',
                                            display: 'flex',
                                            gap: '1rem',
                                            alignItems: 'baseline'
                                        }}>
                                            <span style={{
                                                color: '#3b82f6',
                                                fontSize: '0.75rem',
                                                fontWeight: 800,
                                                textTransform: 'uppercase',
                                                minWidth: '80px'
                                            }}>
                                                {action.type}
                                            </span>
                                            <span style={{ fontSize: '1rem', fontWeight: 500 }}>{action.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>No specific actions recommended.</p>
                            )}
                        </div>

                        {/* RIGHT COLUMN: Stacked Cards (Blockers/Wins) */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                            {/* Blockers (Red Alert Box) */}
                            <div style={{ border: '2px solid #000', padding: '1.5rem', background: '#fff' }}>
                                <h3 style={{
                                    textTransform: 'uppercase',
                                    fontSize: '0.9rem',
                                    fontWeight: 800,
                                    letterSpacing: '0.05em',
                                    color: '#ef4444',
                                    borderBottom: '2px solid #ef4444',
                                    paddingBottom: '0.5rem',
                                    marginBottom: '1rem'
                                }}>
                                    Blockers & Fires
                                </h3>
                                {digest.blockingIssues.length > 0 ? (
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {digest.blockingIssues.map((issue: any, i: number) => (
                                            <li key={i} style={{ marginBottom: '1rem' }}>
                                                <a href="#" style={{ fontWeight: 700, color: '#1e293b', textDecoration: 'none', fontSize: '0.95rem', display: 'block', marginBottom: '0.25rem' }}>{issue.title}</a>
                                                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>in {issue.repo}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No critical issues.</p>
                                )}
                            </div>

                            {/* Quick Wins (Green Box) */}
                            <div style={{ background: '#f0fdf4', padding: '1.5rem', borderTop: '4px solid #22c55e' }}>
                                <h3 style={{
                                    textTransform: 'uppercase',
                                    fontSize: '0.9rem',
                                    fontWeight: 800,
                                    letterSpacing: '0.05em',
                                    color: '#15803d',
                                    marginBottom: '1rem'
                                }}>
                                    Recent Wins
                                </h3>
                                {digest.quickWins.length > 0 ? (
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {digest.quickWins.map((win: any, i: number) => (
                                            <li key={i} style={{ marginBottom: '0.75rem', fontSize: '0.9rem', color: '#166534' }}>
                                                Checkmark: {win.title}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No merges yet.</p>
                                )}
                            </div>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
