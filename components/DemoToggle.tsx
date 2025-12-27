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
                    <div className="clarity-card">
                        {/* Header */}
                        <div className="clarity-header">
                            <h3 className="clarity-title">Daily Digest</h3>
                            <div className="clarity-date-badge">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                1 Jul - 8 Jul
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="clarity-grid">
                            {/* Left: Bubble Chart */}
                            <div className="bubbles-container">
                                {/* Yellow Bubble (Completed) */}
                                <div className="bubble bubble-yellow">
                                    <span className="bubble-count">177</span>
                                    <div className="bubble-tag">
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FCD34D' }}></div>
                                        Completed
                                    </div>
                                </div>

                                {/* Red Bubble (Ongoing) */}
                                <div className="bubble bubble-red">
                                    <span style={{ fontSize: '2rem', fontWeight: 600, color: '#fff' }}>87</span>
                                    <div className="bubble-tag">
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }}></div>
                                        Ongoing
                                    </div>
                                </div>

                                {/* Purple Bubble (Awaiting) */}
                                <div className="bubble bubble-purple">
                                    <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>23</span>
                                    <div className="bubble-tag">
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#8B5CF6' }}></div>
                                        Awaiting
                                    </div>
                                </div>
                            </div>

                            {/* Right: Stats List */}
                            <div className="stats-list">
                                <div className="stat-item">
                                    <div className="stat-label">Completed</div>
                                    <div className="stat-value">177 (67%)</div>
                                    <div className="stat-bar-bg"><div className="stat-bar-fill yellow-fill" style={{ width: '67%' }}></div></div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-label">Ongoing</div>
                                    <div className="stat-value">87 (21%)</div>
                                    <div className="stat-bar-bg"><div className="stat-bar-fill red-fill" style={{ width: '21%' }}></div></div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-label">Awaiting</div>
                                    <div className="stat-value">23 (12%)</div>
                                    <div className="stat-bar-bg"><div className="stat-bar-fill purple-fill" style={{ width: '12%' }}></div></div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Toast */}
                        <div className="clarity-toast">
                            <div className="toast-avatar">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Felix`} alt="User" />
                            </div>
                            <div className="toast-text">
                                <span className="toast-highlight">+14</span>
                                users signed in less than a minute!
                            </div>
                            <div className="toast-close">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                            </div>
                        </div>

                        <style jsx>{`
                            .clarity-card {
                                width: 100%;
                                max-width: 700px;
                                text-align: left;
                                padding: 1.5rem; /* Mobile Padding */
                                background: #fff;
                                border-radius: 32px;
                                box-shadow: 0 20px 60px -10px rgba(0,0,0,0.1);
                                border: 1px solid rgba(0,0,0,0.05);
                                position: relative;
                            }
                            .clarity-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
                            .clarity-title { font-size: 1.5rem; font-weight: 700; color: #111; margin: 0; }
                            .clarity-date-badge {
                                padding: 0.5rem 0.75rem; background: #F3F4F6; border-radius: 12px;
                                display: flex; align-items: center; gap: 0.5rem; color: #374151; fontWeight: 600; fontSize: 0.8rem;
                            }

                            .clarity-grid { display: flex; flex-direction: column; gap: 2rem; }
                            
                            .bubbles-container { position: relative; height: 320px; width: 100%; overflow: hidden; } /* Ensure overflow hidden for mobile safety */
                            
                            .bubble { position: absolute; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 1; }
                            .bubble-tag {
                                position: absolute; background: #fff; padding: 0.3rem 0.6rem; border-radius: 8px;
                                box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 6px;
                                fontSize: 0.8rem; fontWeight: 600; color: #374151; white-space: nowrap;
                            }

                            /* Bubble Specifics */
                            .bubble-yellow {
                                top: 0; left: 50%; transform: translateX(-50%);
                                width: 160px; height: 160px; background: #FCD34D;
                                box-shadow: 0 10px 30px rgba(252, 211, 77, 0.4); z-index: 2;
                            }
                            .bubble-yellow .bubble-tag { top: -10px; left: -10px; }
                            
                            .bubble-count { font-size: 2.5rem; fontWeight: 600; color: #111; }

                            .bubble-red {
                                bottom: 20px; left: 0;
                                width: 110px; height: 110px; background: #EF4444;
                                box-shadow: 0 10px 30px rgba(239, 68, 68, 0.4); z-index: 1;
                            }
                            .bubble-red .bubble-tag { top: -20px; left: 0px; }

                            .bubble-purple {
                                bottom: 10px; right: 0;
                                width: 90px; height: 90px; background: #8B5CF6;
                                box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4); z-index: 3;
                            }
                            .bubble-purple .bubble-tag { bottom: -10px; right: -10px; }

                            /* Stats */
                            .stats-list { display: flex; flex-direction: column; gap: 0.75rem; }
                            .stat-item { padding: 1rem; background: #F9FAFB; border-radius: 16px; }
                            .stat-label { font-size: 0.85rem; color: #6B7280; margin-bottom: 0.25rem; }
                            .stat-value { font-size: 1.1rem; fontWeight: 700; color: #111; margin-bottom: 0.5rem; }
                            .stat-bar-bg { height: 4px; width: 100%; background: #E5E7EB; border-radius: 2px; }
                            .stat-bar-fill { height: 100%; border-radius: 2px; }
                            .yellow-fill { background: #FCD34D; }
                            .red-fill { background: #EF4444; }
                            .purple-fill { background: #8B5CF6; }

                            /* Toast */
                            .clarity-toast {
                                margin-top: 2rem; padding: 0.75rem; background: #F9FAFB; border-radius: 12px;
                                display: flex; align-items: center; gap: 0.75rem;
                            }
                            .toast-avatar { width: 36px; height: 36px; border-radius: 8px; overflow: hidden; background: #ddd; flex-shrink: 0; }
                            .toast-avatar img { width: 100%; height: 100%; }
                            .toast-text { font-size: 0.85rem; color: #374151; line-height: 1.3; }
                            .toast-highlight { fontWeight: 700; font-size: 1rem; margin-right: 0.5rem; }
                            .toast-close { margin-left: auto; cursor: pointer; color: #9CA3AF; }

                            /* Desktop Styles */
                            @media (min-width: 768px) {
                                .clarity-card { padding: 3rem; }
                                .clarity-title { font-size: 2rem; }
                                .clarity-date-badge { font-size: 0.9rem; padding: 0.5rem 1rem; }
                                .clarity-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 2rem; }
                                .bubbles-container { height: 300px; overflow: visible; }
                                .bubble-yellow { width: 180px; height: 180px; }
                                .bubble-red { width: 130px; height: 130px; left: 10px; }
                                .bubble-purple { width: 90px; height: 90px; right: 40px; bottom: 0; }
                                .stats-list { gap: 1rem; }
                                .stat-value { font-size: 1.25rem; }
                                .clarity-toast { gap: 1rem; }
                                .toast-avatar { width: 40px; height: 40px; }
                                .toast-text { font-size: 0.9rem; }
                                .toast-highlight { font-size: 1.1rem; }
                            }
                        `}</style>
                    </div>
                )}
            </div>


        </section>
    );
}
