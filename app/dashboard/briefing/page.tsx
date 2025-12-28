'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Hourglass, Sun, Moon } from 'lucide-react'; // Ensure lucide-react is installed

const MOCK_DIGEST = {
    summary: "Your daily briefing is being compiled. We are analyzing the latest pull requests, identifying potential blockers, and outlining your key wins for the day. Check back at the scheduled time for the full report.",
    blockingIssues: [
        { repo: 'frontend-core', title: 'Dependency conflict in auth-provider' },
        { repo: 'backend-api', title: 'Rate limiting middleware causing timeouts' },
        { repo: 'mobile-app', title: 'Crash on launch in iOS 17 beta' }
    ],
    suggestedActions: [
        { label: 'Review PR #124 for breaking changes' },
        { label: 'Merge stabilization fix for v2.4 release' },
        { label: 'Update documentation for new key rotation policy' }
    ],
    quickWins: [
        { repo: 'frontend-uikit', title: 'Button component accessibility fix' },
        { repo: 'docs', title: 'Updated API reference for Q3' }
    ]
};

export default function DailyBriefingPage() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [digest, setDigest] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [lockedState, setLockedState] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>(null);

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
            // Merge debug info from API response into digest state
            setDigest({ ...data.data, debug: data.debug });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    // Determine what to show: Real Digest OR Mock Digest (if locked)
    const displayDigest = digest || (lockedState ? MOCK_DIGEST : null);

    return (
        <div className="page-wrapper">

            {/* Ambient Background for Page */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '500px', background: 'linear-gradient(180deg, #f8fafc 0%, rgba(255,255,255,0) 100%)', zIndex: -1 }} />
            <div style={{ position: 'fixed', top: '-10%', right: '-10%', width: '600px', height: '600px', background: 'rgba(59, 130, 246, 0.03)', borderRadius: '50%', filter: 'blur(100px)', zIndex: -1 }} />

            {/* Header */}
            <header className="page-header">
                <div className="badge">
                    Daily Intelligence
                </div>
                <h1 className="main-title">
                    Ready for your day?
                </h1>
                <p className="subtitle">
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
            {loading && !digest && !lockedState && (
                <div style={{ padding: '6rem 0', textAlign: 'center' }}>
                    <div style={{ width: 48, height: 48, border: '4px solid #e2e8f0', borderTopColor: '#0f172a', borderRadius: '50%', margin: '0 auto 1.5rem', animation: 'spin 1s linear infinite' }} />
                    <p style={{ color: '#64748b', fontWeight: 500 }}>Connecting the dots...</p>
                </div>
            )}

            {/* Content Grid (Real or Mock) */}
            {displayDigest && (
                <div className={`content-container ${lockedState ? 'is-blurred' : 'animate-in fade-in slide-in-from-bottom-8 duration-700'}`}>

                    {/* Main Summary Card */}
                    <section style={{ marginBottom: '3rem' }}>
                        <div className="summary-card">
                            <div className="summary-accent" />

                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem' }}>Executive Summary</h3>
                            <div className="summary-text">
                                {displayDigest.summary}
                            </div>
                        </div>
                    </section>

                    {/* Masonry Grid */}
                    <div className="masonry-grid">

                        {/* Fires (Red) */}
                        <div className="grid-card red-card">
                            <div className="card-header">
                                <div className="icon-box red-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
                                </div>
                                <h3>Blockers</h3>
                            </div>

                            {displayDigest.blockingIssues.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {displayDigest.blockingIssues.map((issue: any, i: number) => (
                                        <li key={i} className="list-item red-list">
                                            <span className="repo-tag red-text">{issue.repo}</span>
                                            {issue.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>No critical fires today.</p>
                            )}
                        </div>

                        {/* Action Plan (Blue) */}
                        <div className="grid-card blue-card">
                            <div className="card-header">
                                <div className="icon-box blue-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                </div>
                                <h3>Priority Actions</h3>
                            </div>

                            {displayDigest.suggestedActions.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {displayDigest.suggestedActions.map((action: any, i: number) => (
                                        <li key={i} className="list-item blue-list" style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B82F6', flexShrink: 0 }}></div>
                                            <span>{action.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>No specific actions suggested.</p>
                            )}
                        </div>

                        {/* Wins (Green) */}
                        <div className="grid-card green-card">
                            <div className="card-header">
                                <div className="icon-box green-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                <h3>Wins</h3>
                            </div>

                            {displayDigest.quickWins.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {displayDigest.quickWins.map((win: any, i: number) => (
                                        <li key={i} className="list-item green-list">
                                            <span className="repo-tag green-text">{win.repo}</span>
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

            {/* LOCKED OVERLAY */}
            {lockedState && (
                <div className="locked-overlay">
                    <div className="locked-card fade-in-up">
                        <div className="icon-wrapper">
                            <div className="icon-ring"></div>
                            {/* Determine Icon: Sun for morning, Moon for evening */}
                            {lockedState.schedule === 'morning'
                                ? <Sun size={48} className="main-icon" strokeWidth={1.5} />
                                : <Moon size={48} className="main-icon" strokeWidth={1.5} />
                            }
                        </div>

                        <h2 className="locked-title">
                            {lockedState.schedule === 'morning' ? 'Reviewing Morning Intel' : 'Compiling Evening Wrap-up'}
                        </h2>

                        <p className="locked-subtitle">
                            Your briefing is locked until <strong>{lockedState.unlockHour > 12 ? `${lockedState.unlockHour - 12}:00 PM` : `${lockedState.unlockHour}:00 AM`}</strong> to help you stay focused.
                        </p>

                        <div className="status-badge">
                            <span className="pulsing-dot"></span>
                            Status: <span style={{ fontWeight: 600, marginLeft: '4px' }}>Focus Mode</span>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

                .page-wrapper {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 3rem 1.5rem; /* Reduced horizontal padding for mobile */
                    position: relative;
                    min-height: 100vh; /* Ensure full height */
                }
                @media (min-width: 768px) {
                    .page-wrapper { padding: 3rem 2rem; }
                }

                /* BLURRED MOCK CONTENT */
                .is-blurred {
                    filter: blur(8px);
                    opacity: 0.5;
                    pointer-events: none;
                    user-select: none;
                }

                /* LOCKED OVERLAY */
                .locked-overlay {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    z-index: 50;
                    display: flex;
                    align-items: center; /* Center vertically in page-wrapper */
                    justify-content: center;
                    /* Optional: extra gradient overlay */
                    background: linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.8) 100%);
                    min-height: 80vh; 
                }

                .locked-card {
                    text-align: center;
                    background: #ffffff;
                    padding: 3rem 2rem;
                    border-radius: 24px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05);
                    border: 1px solid #f1f5f9;
                    max-width: 480px;
                    width: 90%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    /* Ensure card stays legible above blur */
                    backdrop-filter: blur(0px); 
                }
                
                .icon-wrapper {
                    position: relative;
                    margin-bottom: 2rem;
                    width: 80px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .icon-ring {
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    border-radius: 50%;
                    border: 2px solid #e2e8f0;
                    opacity: 0.5;
                }

                .main-icon {
                    color: #64748b;
                    z-index: 2;
                }

                .locked-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 0.75rem;
                    letter-spacing: -0.02em;
                }

                .locked-subtitle {
                    font-size: 1rem;
                    color: #64748b;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                    max-width: 90%;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    padding: 0.5rem 1rem;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 99px;
                    font-size: 0.85rem;
                    color: #475569;
                }

                .pulsing-dot {
                    width: 8px;
                    height: 8px;
                    background-color: #f59e0b; /* Amber for 'Focus/Wait' */
                    border-radius: 50%;
                    margin-right: 8px;
                    box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
                    70% { box-shadow: 0 0 0 6px rgba(245, 158, 11, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
                }

                .fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                    opacity: 0;
                    transform: translateY(20px);
                }

                @keyframes fadeInUp {
                    to { opacity: 1; transform: translateY(0); }
                }

                .page-header { margin-bottom: 3rem; position: relative; }
                
                .badge {
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    background: rgba(15, 23, 42, 0.05);
                    color: #0f172a;
                    border-radius: 99px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 1.5rem;
                }

                .main-title {
                    font-size: 2.5rem; /* Mobile Size */
                    font-weight: 800;
                    letter-spacing: -0.03em;
                    color: #0f172a;
                    line-height: 1.1;
                    margin-bottom: 1rem;
                    background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                @media (min-width: 768px) {
                    .main-title { font-size: 3.5rem; }
                }

                .subtitle {
                    font-size: 1.1rem;
                    color: #64748b;
                    max-width: 600px;
                    line-height: 1.6;
                }
                @media (min-width: 768px) {
                    .subtitle { font-size: 1.25rem; }
                }

                /* Summary Card */
                .summary-card {
                    background: #ffffff;
                    border-radius: 24px;
                    padding: 1.5rem; /* Mobile Padding */
                    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08);
                    border: 1px solid rgba(226, 232, 240, 0.8);
                    position: relative;
                    overflow: hidden;
                }
                @media (min-width: 768px) {
                    .summary-card { padding: 3rem; }
                }
                .summary-accent {
                    position: absolute;
                    top: 0; left: 0;
                    width: 6px; height: 100%;
                    background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
                }
                .summary-text {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: #334155;
                }
                @media (min-width: 768px) {
                    .summary-text { font-size: 1.25rem; line-height: 1.8; }
                }

                /* Masonry Grid */
                .masonry-grid {
                    display: grid;
                    grid-template-columns: 1fr; /* Mobile First: 1 Column */
                    gap: 1.5rem;
                }
                @media (min-width: 768px) {
                    .masonry-grid {
                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Desktop: Auto Grid */
                        gap: 2rem;
                    }
                }

                /* Grid Cards */
                .grid-card {
                    background: #fff;
                    border-radius: 24px;
                    padding: 1.5rem;
                    cursor: default;
                    transition: transform 0.2s;
                }
                @media (min-width: 768px) {
                    .grid-card { padding: 2rem; }
                    .grid-card:hover { transform: translateY(-4px); }
                }

                .card-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
                .card-header h3 { font-size: 1.25rem; font-weight: 700; color: #1e293b; }
                
                .icon-box {
                    width: 48px; height: 48px;
                    border-radius: 16px;
                    display: flex; align-items: center; justify-content: center;
                }

                .list-item {
                    padding: 1rem;
                    border-radius: 12px;
                    margin-bottom: 1rem;
                    font-size: 0.95rem;
                }

                .repo-tag {
                    font-weight: 700; display: block; margin-bottom: 0.25rem; font-size: 0.85rem; text-transform: uppercase;
                }

                /* Red Theme */
                .red-card { box-shadow: 0 10px 30px -5px rgba(239, 68, 68, 0.1); border: 1px solid #FEE2E2; }
                .red-icon { background: #FEF2F2; color: #EF4444; }
                .red-list { background: #FEF2F2; color: #991B1B; }
                .red-text { color: #EF4444; }

                /* Blue Theme */
                .blue-card { box-shadow: 0 10px 30px -5px rgba(59, 130, 246, 0.1); border: 1px solid #DBEAFE; }
                .blue-icon { background: #EFF6FF; color: #3B82F6; }
                .blue-list { background: #F8FAFC; border: 1px solid #F1F5F9; color: #334155; }

                /* Green Theme */
                .green-card { box-shadow: 0 10px 30px -5px rgba(34, 197, 94, 0.1); border: 1px solid #DCFCE7; }
                .green-icon { background: #F0FDF4; color: #22C55E; }
                .green-list { background: #F0FDF4; color: #166534; }
                .green-text { color: #22C55E; }
            `}</style>

            {/* DEBUG FOOTER (TEMPORARY) */}
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(digest as any)?.debug && (
                <div style={{
                    textAlign: 'center',
                    marginTop: '4rem',
                    padding: '1rem',
                    borderTop: '1px solid #e2e8f0',
                    color: '#94a3b8',
                    fontSize: '0.8rem',
                    fontFamily: 'monospace'
                }}>
                    DEBUG: Schedule={(digest as any).debug.schedule} |
                    ServerHour={(digest as any).debug.serverHour} |
                    Unlock={(digest as any).debug.unlockHour} |
                    Source={(digest as any).debug.type}
                </div>
            )}
        </div>
    );
}
