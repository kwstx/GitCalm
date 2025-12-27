'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function DailyBriefingPage() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [digest, setDigest] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Initial Load - Check Cache/Generate
    useEffect(() => {
        if (session) {
            fetchDigest();
        }
    }, [session]);

    const fetchDigest = async () => {
        setLoading(true);
        setError(null);
        try {
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
            if (data.error) throw new Error(data.error);
            setDigest(data.data);
        } catch (err: any) {
            setError(err.message || "Failed to load briefing");
        } finally {
            setLoading(false);
        }
    };

    if (!session) return null;

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', fontFamily: 'var(--font-geist-sans), sans-serif' }}>

            {/* Header */}
            <header style={{ marginBottom: '3rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
                    Morning Briefing
                </h1>
                <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
            </header>

            {/* Error State */}
            {error && (
                <div style={{ padding: '1rem', background: '#fef2f2', color: '#ef4444', borderRadius: '12px', marginBottom: '2rem' }}>
                    ⚠️ {error} <button onClick={fetchDigest} style={{ textDecoration: 'underline', marginLeft: '1rem' }}>Retry</button>
                </div>
            )}

            {/* Loading State */}
            {loading && !digest && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', padding: '4rem 0', color: '#94a3b8' }}>
                    <div className="spinner" style={{ width: 32, height: 32, border: '3px solid #e2e8f0', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    <p>Analyzing GitHub activity from the last 24 hours...</p>
                    <style jsx>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            )}

            {/* Content State */}
            {digest && (
                <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    <style jsx>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>

                    {/* Executive Summary */}
                    <section style={{ marginBottom: '3rem' }}>
                        <div style={{
                            fontSize: '1.4rem',
                            lineHeight: '1.6',
                            color: '#1e293b',
                            background: '#f8fafc',
                            padding: '2rem',
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0',
                            fontFamily: 'var(--font-geist-mono), monospace' // Typewriter feel
                        }}>
                            {digest.summary}
                        </div>
                    </section>

                    {/* Grid Layout for Details */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                        {/* Blocking Issues (Red) */}
                        <div style={{ background: '#fff', border: '1px solid #fee2e2', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.05)' }}>
                            <h3 style={{ color: '#ef4444', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                Attention Required
                            </h3>
                            {digest.blockingIssues.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {digest.blockingIssues.map((issue: any, i: number) => (
                                        <li key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid #fecaca', fontSize: '0.95rem' }}>
                                            <span style={{ fontWeight: 600, display: 'block' }}>{issue.repo}</span>
                                            {issue.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>No blocking issues detected.</p>
                            )}
                        </div>

                        {/* Quick Wins (Green) */}
                        <div style={{ background: '#fff', border: '1px solid #dcfce7', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.05)' }}>
                            <h3 style={{ color: '#22c55e', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                Quick Wins
                            </h3>
                            {digest.quickWins.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {digest.quickWins.map((win: any, i: number) => (
                                        <li key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid #bbf7d0', fontSize: '0.95rem' }}>
                                            <span style={{ fontWeight: 600, display: 'block' }}>{win.repo}</span>
                                            {win.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>No merges detected yet.</p>
                            )}
                        </div>

                        {/* Suggested Actions (Blue) */}
                        <div style={{ background: '#fff', border: '1px solid #dbeafe', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.05)' }}>
                            <h3 style={{ color: '#3b82f6', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                                Action Plan
                            </h3>
                            {digest.suggestedActions.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {digest.suggestedActions.map((action: any, i: number) => (
                                        <li key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid #bfdbfe', fontSize: '0.95rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                            <span style={{
                                                background: '#eff6ff',
                                                color: '#3b82f6',
                                                fontSize: '0.7rem',
                                                fontWeight: 700,
                                                padding: '2px 6px',
                                                borderRadius: '4px',
                                                textTransform: 'uppercase'
                                            }}>
                                                {action.type}
                                            </span>
                                            {action.label}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>No specific actions recommended.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
