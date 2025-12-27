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
                    userContext: 'Engineering Lead'
                })
            });
            const data = await response.json();

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
        return <div style={{ padding: '6rem', textAlign: 'center', color: '#64748b' }}>Loading daily briefing...</div>;
    }

    if (status === 'unauthenticated' || !session) {
        return <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Please log in to view your briefing.</div>;
    }

    // LOCKED STATE (Modern UI)
    if (lockedState) {
        return (
            <div style={{ maxWidth: '800px', margin: '4rem auto', textAlign: 'center', fontFamily: 'var(--font-geist-sans), sans-serif' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>☕</div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
                    Good {lockedState.schedule === 'morning' ? 'Morning' : 'Afternoon'}, {session.user?.name?.split(' ')[0] || 'User'}.
                </h2>
                <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '460px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
                    Your {lockedState.schedule} briefing is being prepared. It will be unlocked at <strong>{lockedState.unlockHour > 12 ? `${lockedState.unlockHour - 12} PM` : `${lockedState.unlockHour} AM`}</strong>.
                </p>
                <div style={{
                    padding: '0.75rem 1.5rem',
                    background: '#f1f5f9',
                    borderRadius: '99px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#64748b',
                    fontWeight: 500
                }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#94a3b8' }}></div>
                    Current time: {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </div>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem',
            fontFamily: 'var(--font-geist-sans), sans-serif',
            color: '#0f172a'
        }}>
            {/* Modern Header */}
            <header style={{ marginBottom: '2.5rem' }}>
                <div style={{
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#64748b',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem'
                }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#0f172a',
                    marginBottom: '0.5rem'
                }}>
                    Daily Briefing
                </h1>
                <p style={{ color: '#64748b', fontSize: '1rem' }}>
                    Here is what you need to know for today.
                </p>
            </header>

            {/* Error State */}
            {error && (
                <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', borderRadius: '12px', marginBottom: '2rem' }}>
                    ⚠️ {error} <button onClick={fetchDigest} style={{ textDecoration: 'underline', marginLeft: '1rem', fontWeight: 500 }}>Retry</button>
                </div>
            )}

            {/* Loading Content */}
            {loading && !digest && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', padding: '6rem 0', color: '#94a3b8' }}>
                    <div className="spinner" style={{ width: 32, height: 32, border: '3px solid #e2e8f0', borderTopColor: '#0f172a', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>Analyzing GitHub activity...</p>
                    <style jsx>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            )}

            {/* Main Content */}
            {digest && (
                <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    <style jsx>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>

                    {/* Top Row: Summary */}
                    <section style={{ marginBottom: '2rem' }}>
                        <div style={{
                            background: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '16px',
                            padding: '2rem',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#334155' }}>Executive Summary</h3>
                            <div style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#334155' }}>
                                {digest.summary}
                            </div>
                        </div>
                    </section>

                    {/* Three Column Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>

                        {/* Column 1: Blockers (Red) */}
                        <div style={{
                            background: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}>
                            <h3 style={{
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                color: '#ef4444',
                                marginBottom: '1.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }}></div>
                                BLOCKERS & FIRES
                            </h3>

                            {digest.blockingIssues.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {digest.blockingIssues.map((issue: any, i: number) => (
                                        <li key={i} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: i === digest.blockingIssues.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                                            <a href="#" style={{ fontWeight: 600, color: '#1e293b', textDecoration: 'none', fontSize: '0.95rem', display: 'block', marginBottom: '0.25rem', lineHeight: '1.4' }}>{issue.title}</a>
                                            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                                {issue.repo}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic' }}>No critical blockers found.</p>
                            )}
                        </div>

                        {/* Column 2: Action Plan (Blue) */}
                        <div style={{
                            background: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}>
                            <h3 style={{
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                color: '#3b82f6',
                                marginBottom: '1.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }}></div>
                                ACTION PLAN
                            </h3>
                            {digest.suggestedActions.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {digest.suggestedActions.map((action: any, i: number) => (
                                        <li key={i} style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                            <span style={{
                                                background: '#eff6ff',
                                                color: '#3b82f6',
                                                fontSize: '0.65rem',
                                                fontWeight: 700,
                                                padding: '2px 6px',
                                                borderRadius: '4px',
                                                textTransform: 'uppercase',
                                                marginTop: '3px'
                                            }}>
                                                {action.type}
                                            </span>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#334155', lineHeight: '1.5' }}>{action.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic' }}>No actions suggested.</p>
                            )}
                        </div>

                        {/* Column 3: Quick Wins (Green) */}
                        <div style={{
                            background: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}>
                            <h3 style={{
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                color: '#22c55e',
                                marginBottom: '1.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }}></div>
                                QUICK WINS
                            </h3>
                            {digest.quickWins.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {digest.quickWins.map((win: any, i: number) => (
                                        <li key={i} style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                                            <div style={{ color: '#22c55e', marginTop: '1px' }}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            </div>
                                            <span style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.5' }}>{win.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic' }}>No recent merges.</p>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
