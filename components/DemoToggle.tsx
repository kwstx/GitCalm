'use client';
import { useState } from 'react';

export default function DemoToggle() {
    const [activeTab, setActiveTab] = useState<'noisy' | 'calm'>('calm');

    return (
        <section className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'var(--font-h2)', marginBottom: '2rem' }}>Experience the Clarity</h2>

            {/* Toggle */}
            <div style={{
                display: 'inline-flex',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-full)',
                padding: '0.25rem',
                marginBottom: '3rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}>
                <button
                    onClick={() => setActiveTab('noisy')}
                    style={{
                        padding: '0.75rem 2rem',
                        borderRadius: 'var(--radius-full)',
                        border: 'none',
                        background: activeTab === 'noisy' ? 'hsl(var(--foreground))' : 'transparent',
                        color: activeTab === 'noisy' ? 'hsl(var(--background))' : 'hsl(var(--foreground))',
                        cursor: 'pointer',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        fontSize: '1rem'
                    }}
                >
                    Raw GitHub
                </button>
                <button
                    onClick={() => setActiveTab('calm')}
                    style={{
                        padding: '0.75rem 2rem',
                        borderRadius: 'var(--radius-full)',
                        border: 'none',
                        background: activeTab === 'calm' ? 'hsl(var(--foreground))' : 'transparent',
                        color: activeTab === 'calm' ? 'hsl(var(--background))' : 'hsl(var(--foreground))',
                        cursor: 'pointer',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        fontSize: '1rem'
                    }}
                >
                    GitCalm
                </button>
            </div>

            {/* Content Area */}
            <div style={{ minHeight: '500px', display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
                {activeTab === 'noisy' ? (
                    <div className="card" style={{ width: '100%', maxWidth: '600px', textAlign: 'left', overflow: 'hidden', animation: 'fadeIn 0.3s ease' }}>
                        <div style={{ padding: '0.75rem 1rem', background: '#f6f8fa', borderBottom: '1px solid var(--border)', fontSize: '0.85rem', color: '#57606a', fontWeight: 600 }}>
                            Notifications (142)
                        </div>
                        {/* List of noise */}
                        {[
                            { icon: 'x', color: '#cf222e', text: 'ci/circleci: build-test-deploy job failed', sub: 'payment-service', time: '2m ago' },
                            { icon: '●', color: '#1a7f37', text: 'dependabot[bot] commented on PR #432', sub: 'auth-service', time: '5m ago' },
                            { icon: '●', color: '#9a6700', text: 'review requested: feat: add new schema', sub: 'core-api', time: '12m ago' },
                            { icon: 'x', color: '#cf222e', text: 'tests failed: integration-suite', sub: 'payment-service', time: '15m ago' },
                            { icon: '●', color: '#1a7f37', text: 'merged: fix typo in README', sub: 'docs', time: '22m ago' },
                            { icon: '●', color: '#0969da', text: 'assigned: bug: user login timeout', sub: 'webapp', time: '30m ago' }
                        ].map((item, i) => (
                            <div key={i} style={{ padding: '1rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
                                <div style={{ width: 16, marginTop: 4, color: item.color, fontWeight: 'bold' }}>{item.icon}</div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: 500 }}>{item.text}</div>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{item.time} • {item.sub}</div>
                                </div>
                            </div>
                        ))}
                        <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.85rem', color: 'hsl(var(--primary))', cursor: 'pointer' }}>View 136 more...</div>
                    </div>
                ) : (
                    <div style={{
                        width: '100%',
                        maxWidth: '600px',
                        textAlign: 'left',
                        padding: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                        animation: 'fadeIn 0.3s ease',
                        background: '#fff',
                        borderRadius: '24px',
                        boxShadow: '0 20px 40px -5px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.5rem', borderBottom: '1px solid #f0f0f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: '16px',
                                    background: '#10B981',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    boxShadow: '0 8px 16px -4px rgba(16, 185, 129, 0.3)'
                                }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111', lineHeight: 1.1, marginBottom: '0.2rem' }}>Daily Digest</h3>
                                    <span style={{ fontSize: '0.95rem', color: '#666', fontWeight: 500 }}>Prepared just now for you</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <p style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#999', letterSpacing: '0.05em' }}>Key Highlights</p>
                                <span style={{ fontSize: '0.85rem', color: '#3B82F6', fontWeight: 600, cursor: 'pointer' }}>View All Activity</span>
                            </div>

                            {/* Item 1: Alert */}
                            <div style={{
                                padding: '1.5rem',
                                background: '#FEF2F2',
                                borderRadius: '16px',
                                marginBottom: '1rem',
                                border: '1px solid #FEE2E2',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: '#EF4444', fontWeight: 700, fontSize: '0.9rem' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                    Action Required
                                </div>
                                <p style={{ lineHeight: 1.5, fontSize: '1.05rem', color: '#444' }}>
                                    <span style={{ fontWeight: 700, color: '#111' }}>CI/CD Blockage:</span> Tests in <span style={{ fontWeight: 600, background: '#fff', padding: '2px 6px', borderRadius: 4, border: '1px solid #facaca' }}>payment-service</span> are failing integration checks.
                                </p>
                            </div>

                            {/* Item 2: Summary */}
                            <div style={{
                                padding: '1.5rem',
                                background: '#F0F9FF',
                                borderRadius: '16px',
                                border: '1px solid #E0F2FE'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: '#0284C7', fontWeight: 700, fontSize: '0.9rem' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                                    </svg>
                                    Activity Velocity
                                </div>
                                <p style={{ lineHeight: 1.5, fontSize: '1.05rem', color: '#444' }}>
                                    <span style={{ fontWeight: 700, color: '#111' }}>12 PRs Merged.</span> High velocity in <span style={{ fontWeight: 600, color: '#0284C7' }}>auth-service</span> (Frontend Team).
                                </p>
                            </div>
                        </div>

                        <div style={{ marginTop: '0.5rem' }}>
                            <button style={{
                                width: '100%',
                                background: '#111',
                                color: '#fff',
                                border: 'none',
                                padding: '1.25rem',
                                borderRadius: '16px',
                                fontSize: '1rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                transition: 'opacity 0.2s'
                            }}>
                                View Full Report
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </section>
    );
}
