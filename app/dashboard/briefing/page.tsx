'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function DailyBriefingPage() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [digest, setDigest] = useState<any>(null);
    const [lockedState, setLockedState] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

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
        return <div className="flex-center" style={{ height: '50vh', color: '#64748b' }}>Loading daily briefing...</div>;
    }

    if (status === 'unauthenticated' || !session) {
        return <div className="flex-center" style={{ height: '50vh', color: '#64748b' }}>Please log in to view your briefing.</div>;
    }

    // --- LOCKED STATE (Unique "Waiting" UI) ---
    if (lockedState) {
        return (
            <div style={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: 'radial-gradient(circle at 50% 50%, #f1f5f9 0%, #fff 100%)'
            }}>
                {/* Ambient Blobs */}
                <div style={{ position: 'absolute', top: '20%', left: '20%', width: '300px', height: '300px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', filter: 'blur(80px)' }} />
                <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: '300px', height: '300px', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '50%', filter: 'blur(80px)' }} />

                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    padding: '3rem',
                    borderRadius: '32px',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.05)',
                    maxWidth: '500px'
                }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '1rem', animation: 'float 3s ease-in-out infinite' }}>☕</div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>
                        Good {lockedState.schedule === 'morning' ? 'Morning' : 'Afternoon'}.
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>
                        The briefing is locked until <strong>{lockedState.unlockHour > 12 ? `${lockedState.unlockHour - 12} PM` : `${lockedState.unlockHour} AM`}</strong> to help you focus.
                    </p>

                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1.25rem',
                        background: '#f8fafc',
                        borderRadius: '99px',
                        border: '1px solid #e2e8f0',
                        fontSize: '0.9rem',
                        color: '#475569',
                        fontWeight: 600
                    }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#94a3b8', boxShadow: '0 0 0 2px rgba(148, 163, 184, 0.2)' }}></div>
                        {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </div>
                </div>
                <style jsx>{`@keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }`}</style>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '3rem 2rem',
            position: 'relative'
        }}>

            {/* Ambient Background for Page */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '500px', background: 'linear-gradient(180deg, #f8fafc 0%, rgba(255,255,255,0) 100%)', zIndex: -1 }} />
            <div style={{ position: 'fixed', top: '-10%', right: '-10%', width: '600px', height: '600px', background: 'rgba(59, 130, 246, 0.03)', borderRadius: '50%', filter: 'blur(100px)', zIndex: -1 }} />

            {/* Header */}
            <header style={{ marginBottom: '4rem', position: 'relative' }}>
                <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: 'rgba(15, 23, 42, 0.05)',
                    color: '#0f172a',
                    borderRadius: '99px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '1.5rem'
                }}>
                    Daily Intelligence
                </div>
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: '#0f172a',
                    lineHeight: '1.1',
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Ready for your day?
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '600px' }}>
                    Here’s the breakdown of yesterday’s activity and what needs your attention today.
                </p>
            </header>

            {/* Error State */}
            {error && (
                <div style={{ padding: '1rem', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C', borderRadius: '16px', marginBottom: '2rem' }}>
                    ⚠️ {error} <button onClick={fetchDigest} style={{ textDecoration: 'underline', marginLeft: '1rem', fontWeight: 600 }}>Retry</button>
                </div>
            )}

            {/* Loading */}
            {loading && !digest && (
                <div style={{ padding: '6rem 0', textAlign: 'center' }}>
                    <div style={{ width: 48, height: 48, border: '4px solid #e2e8f0', borderTopColor: '#0f172a', borderRadius: '50%', margin: '0 auto 1.5rem', animation: 'spin 1s linear infinite' }} />
                    <p style={{ color: '#64748b', fontWeight: 500 }}>Connecting the dots...</p>
                    <style jsx>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            )}

            {/* Content Grid */}
            {digest && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">

                    {/* Main Summary Card */}
                    <section style={{ marginBottom: '3rem' }}>
                        <div style={{
                            background: '#ffffff',
                            borderRadius: '24px',
                            padding: '3rem',
                            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.08)',
                            border: '1px solid rgba(226, 232, 240, 0.8)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '6px',
                                height: '100%',
                                background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6)'
                            }} />

                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem' }}>Executive Summary</h3>
                            <div style={{ fontSize: '1.25rem', lineHeight: '1.8', color: '#334155' }}>
                                {digest.summary}
                            </div>
                        </div>
                    </section>

                    {/* Masonry Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>

                        {/* Fires (Red) */}
                        <div style={{
                            background: '#fff',
                            borderRadius: '24px',
                            padding: '2rem',
                            boxShadow: '0 10px 30px -5px rgba(239, 68, 68, 0.1)',
                            border: '1px solid #FEE2E2',
                            transition: 'transform 0.2s',
                            cursor: 'default'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: 48, height: 48,
                                    borderRadius: '16px',
                                    background: '#FEF2F2',
                                    color: '#EF4444',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>Blockers</h3>
                            </div>

                            {digest.blockingIssues.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {digest.blockingIssues.map((issue: any, i: number) => (
                                        <li key={i} style={{ padding: '1rem', background: '#FEF2F2', borderRadius: '12px', marginBottom: '1rem', fontSize: '0.95rem', color: '#991B1B' }}>
                                            <span style={{ fontWeight: 700, display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: '#EF4444', textTransform: 'uppercase' }}>{issue.repo}</span>
                                            {issue.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>No critical fires today.</p>
                            )}
                        </div>

                        {/* Action Plan (Blue) */}
                        <div style={{
                            background: '#fff',
                            borderRadius: '24px',
                            padding: '2rem',
                            boxShadow: '0 10px 30px -5px rgba(59, 130, 246, 0.1)',
                            border: '1px solid #DBEAFE',
                            transition: 'transform 0.2s'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: 48, height: 48,
                                    borderRadius: '16px',
                                    background: '#EFF6FF',
                                    color: '#3B82F6',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>Priority Actions</h3>
                            </div>

                            {digest.suggestedActions.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {digest.suggestedActions.map((action: any, i: number) => (
                                        <li key={i} style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '12px', marginBottom: '1rem', fontSize: '0.95rem', border: '1px solid #F1F5F9', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B82F6', flexShrink: 0 }}></div>
                                            <span style={{ color: '#334155' }}>{action.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>No specific actions suggested.</p>
                            )}
                        </div>

                        {/* Wins (Green) */}
                        <div style={{
                            background: '#fff',
                            borderRadius: '24px',
                            padding: '2rem',
                            boxShadow: '0 10px 30px -5px rgba(34, 197, 94, 0.1)',
                            border: '1px solid #DCFCE7',
                            transition: 'transform 0.2s'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: 48, height: 48,
                                    borderRadius: '16px',
                                    background: '#F0FDF4',
                                    color: '#22C55E',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>Wins</h3>
                            </div>

                            {digest.quickWins.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {digest.quickWins.map((win: any, i: number) => (
                                        <li key={i} style={{ padding: '1rem', background: '#F0FDF4', borderRadius: '12px', marginBottom: '1rem', fontSize: '0.95rem', color: '#166534' }}>
                                            <span style={{ fontWeight: 700, display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem', color: '#22C55E' }}>{win.repo}</span>
                                            {win.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>No merges yet.</p>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
