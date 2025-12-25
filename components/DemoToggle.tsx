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
                        maxWidth: '700px',
                        textAlign: 'left',
                        padding: '3rem',
                        background: '#fff',
                        borderRadius: '32px',
                        boxShadow: '0 20px 60px -10px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        position: 'relative'
                    }}>
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#111', margin: 0 }}>Daily Digest</h3>
                            <div style={{
                                padding: '0.5rem 1rem',
                                background: '#F3F4F6',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: '#374151',
                                fontWeight: 600,
                                fontSize: '0.9rem'
                            }}>
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
                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }}>
                            {/* Left: Bubble Chart */}
                            <div style={{ position: 'relative', height: '300px' }}>
                                {/* Yellow Bubble (Completed) */}
                                <div style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '180px',
                                    height: '180px',
                                    borderRadius: '50%',
                                    background: '#FCD34D',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 2,
                                    boxShadow: '0 10px 30px rgba(252, 211, 77, 0.4)'
                                }}>
                                    <span style={{ fontSize: '2.5rem', fontWeight: 600, color: '#111' }}>177</span>
                                    {/* Tag */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-15px',
                                        left: '-20px',
                                        background: '#fff',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        color: '#374151',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FCD34D' }}></div>
                                        Completed
                                    </div>
                                </div>

                                {/* Red Bubble (Ongoing) */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '20px',
                                    left: '10px',
                                    width: '130px',
                                    height: '130px',
                                    borderRadius: '50%',
                                    background: '#EF4444',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 1,
                                    boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)'
                                }}>
                                    <span style={{ fontSize: '2rem', fontWeight: 600, color: '#fff' }}>87</span>
                                    {/* Tag */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '-30px',
                                        background: '#fff',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        color: '#374151',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }}></div>
                                        Ongoing
                                    </div>
                                </div>

                                {/* Purple Bubble (Awaiting) */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    right: '40px',
                                    width: '90px',
                                    height: '90px',
                                    borderRadius: '50%',
                                    background: '#8B5CF6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 3,
                                    boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)'
                                }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>23</span>
                                    {/* Tag */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-10px',
                                        right: '-20px',
                                        background: '#fff',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        color: '#374151',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#8B5CF6' }}></div>
                                        Awaiting
                                    </div>
                                </div>
                            </div>

                            {/* Right: Stats List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {/* Stat 1 */}
                                <div style={{ padding: '1rem', background: '#F9FAFB', borderRadius: '16px' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '0.25rem' }}>Completed</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111', marginBottom: '0.5rem' }}>177 (67%)</div>
                                    <div style={{ height: '4px', width: '100%', background: '#E5E7EB', borderRadius: '2px' }}>
                                        <div style={{ height: '100%', width: '67%', background: '#FCD34D', borderRadius: '2px' }}></div>
                                    </div>
                                </div>
                                {/* Stat 2 */}
                                <div style={{ padding: '1rem', background: '#F9FAFB', borderRadius: '16px' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '0.25rem' }}>Ongoing</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111', marginBottom: '0.5rem' }}>87 (21%)</div>
                                    <div style={{ height: '4px', width: '100%', background: '#E5E7EB', borderRadius: '2px' }}>
                                        <div style={{ height: '100%', width: '21%', background: '#EF4444', borderRadius: '2px' }}></div>
                                    </div>
                                </div>
                                {/* Stat 3 */}
                                <div style={{ padding: '1rem', background: '#F9FAFB', borderRadius: '16px' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '0.25rem' }}>Awaiting</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111', marginBottom: '0.5rem' }}>23 (12%)</div>
                                    <div style={{ height: '4px', width: '100%', background: '#E5E7EB', borderRadius: '2px' }}>
                                        <div style={{ height: '100%', width: '12%', background: '#8B5CF6', borderRadius: '2px' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Toast */}
                        <div style={{
                            marginTop: '2rem',
                            padding: '0.75rem',
                            background: '#F9FAFB',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div style={{ width: 40, height: 40, borderRadius: '8px', overflow: 'hidden', background: '#ddd' }}>
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Felix`} alt="User" style={{ width: '100%', height: '100%' }} />
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#374151' }}>
                                <span style={{ fontWeight: 700, fontSize: '1.1rem', marginRight: '0.5rem' }}>+14</span>
                                users signed in less than a minute!
                            </div>
                            <div style={{ marginLeft: 'auto', cursor: 'pointer', color: '#9CA3AF' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
            </div>


        </section>
    );
}
