'use client';
import Link from 'next/link';

export default function Transform() {
    return (
        <section className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
            {/* Header */}
            <div style={{ maxWidth: '800px', margin: '0 auto 5rem auto' }}>
                <h2 style={{
                    fontSize: '3rem',
                    fontWeight: 800,
                    marginBottom: '1.5rem',
                    lineHeight: 1.1,
                    color: 'hsl(var(--foreground))'
                }}>
                    Turn GitHub Noise <br />
                    Into <span style={{ opacity: 0.5 }}>Daily Insights</span>
                </h2>
                <p style={{
                    fontSize: '1.1rem',
                    opacity: 0.6,
                    lineHeight: 1.6,
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    Stop digging through endless notifications and commit logs. View a consolidated engineering digest that organizes team activity for your daily standup.
                </p>
            </div>

            {/* Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                textAlign: 'left'
            }}>

                {/* Card 1: Supercharge */}
                <div className="glass-card" style={{
                    background: '#f8f9fa', // Light gray background from image
                    padding: '2.5rem',
                    borderRadius: '24px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '400px'
                }}>
                    {/* Visual Area */}
                    <div style={{ position: 'relative', height: '180px', marginBottom: '1rem' }}>
                        {/* Floating Pill: Amount */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            right: '10%',
                            background: '#fff',
                            padding: '0.8rem 1.5rem',
                            borderRadius: '16px',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                            fontSize: '1.8rem',
                            fontWeight: 700,
                            color: '#333'
                        }}>
                            8 <span style={{ fontSize: '0.9rem', color: '#888', fontWeight: 500 }}>Pending</span>
                        </div>

                        {/* Floating Icon: Chart Line */}
                        <div style={{
                            position: 'absolute',
                            top: '60px',
                            left: '0',
                            background: '#fff',
                            width: '80px',
                            height: '80px',
                            borderRadius: '20px',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
                                <circle cx="18" cy="18" r="3"></circle>
                                <circle cx="6" cy="6" r="3"></circle>
                                <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                                <line x1="6" y1="9" x2="6" y2="21"></line>
                            </svg>
                        </div>

                        {/* Floating Icon: Green Status */}
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '25%',
                            background: '#fff',
                            padding: '0.8rem',
                            borderRadius: '20px',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                            textAlign: 'center',
                            minWidth: '100px'
                        }}>
                            <div style={{ width: 32, height: 32, background: '#10B981', borderRadius: '50%', margin: '0 auto 0.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                ✓
                            </div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>12</div>
                            <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>Blockers Resolved</div>
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Track Review Activity</h3>
                        <p style={{ fontSize: '0.95rem', opacity: 0.6, lineHeight: 1.5 }}>
                            Monitor pull request status and identify potential blockers.
                        </p>
                    </div>
                </div>


                {/* Card 2: Visualization */}
                <div className="glass-card" style={{
                    background: '#f8f9fa',
                    padding: '2.5rem',
                    borderRadius: '24px',
                    minHeight: '400px'
                }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Activity Trends</h3>
                        <p style={{ fontSize: '0.95rem', opacity: 0.6, lineHeight: 1.5 }}>
                            Visualize team activity levels over time to spot bottlenecks or productive streaks.
                        </p>
                    </div>

                    {/* Bar Chart Visual */}
                    <div style={{
                        background: '#fff',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                        height: '180px',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: '8px',
                        position: 'relative'
                    }}>
                        <div style={{ width: '15%', height: '40%', background: '#6EE7B7', borderRadius: '4px', opacity: 0.6 }}></div>
                        <div style={{ width: '15%', height: '70%', background: '#34D399', borderRadius: '4px' }}></div>
                        <div style={{ width: '15%', height: '55%', background: '#6EE7B7', borderRadius: '4px', opacity: 0.6 }}></div>
                        <div style={{ width: '15%', height: '85%', background: '#34D399', borderRadius: '4px' }}></div>
                        <div style={{ width: '15%', height: '50%', background: '#6EE7B7', borderRadius: '4px', opacity: 0.6 }}></div>

                        {/* Floating Refresh Button */}
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            right: '-10px',
                            width: '36px',
                            height: '36px',
                            background: '#000',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                        }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                <polyline points="17 6 23 6 23 12"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>


                {/* Card 3: Accelerator */}
                <div className="glass-card" style={{
                    background: '#f8f9fa',
                    padding: '2.5rem',
                    borderRadius: '24px',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Smart Prioritization</h3>
                        <p style={{ fontSize: '0.95rem', opacity: 0.6, lineHeight: 1.5 }}>
                            Automatically highlight critical blockers and successful merges to streamline your workflow.
                        </p>
                    </div>

                    {/* Complex UI Visual */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem', alignItems: 'center' }}>
                        {/* Main Big Block */}
                        <div style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '1.5rem',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', opacity: 0.7 }}>Critical</div>
                            <div style={{ background: '#DC2626', color: '#fff', padding: '1rem', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 700, textAlign: 'center' }}>
                                3
                            </div>
                        </div>

                        {/* Right small blocks */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{
                                background: '#fff',
                                borderRadius: '16px',
                                height: '60px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 5px 10px rgba(0,0,0,0.05)'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                    <line x1="12" y1="9" x2="12" y2="13"></line>
                                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                            </div>
                            <div style={{
                                background: '#fff',
                                borderRadius: '16px',
                                height: '60px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 5px 10px rgba(0,0,0,0.05)'
                            }}>
                                <div style={{ width: 24, height: 24, background: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem' }}>P1</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Row 2: Bottom Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginTop: '2rem',
                textAlign: 'left'
            }}>

                {/* Card 4: Photo / Focus */}
                <div className="glass-card" style={{
                    background: '#f8f9fa',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    minHeight: '400px',
                    position: 'relative',
                    padding: 0 // Image takes full space
                }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/developer_focus.png"
                        alt="Developer Focus"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '2rem',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        color: 'white'
                    }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Deep Focus Mode</h3>
                        <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>
                            Filter out the noise. See only what demands your immediate attention.
                        </p>
                    </div>
                </div>

                {/* Card 5: Segmentation / Stats */}
                <div className="glass-card" style={{
                    background: '#f8f9fa',
                    padding: '2.5rem',
                    borderRadius: '24px',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Activity Filtering</h3>
                        <p style={{ fontSize: '0.95rem', opacity: 0.6, lineHeight: 1.5 }}>
                            Curate your feed by selecting specific repositories and focus areas relevant to your role.
                        </p>
                    </div>

                    {/* Stats Visuals */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'end' }}>

                        {/* Visual 1: Retention/Progress */}
                        <div style={{ background: '#fff', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                            <div style={{ height: '8px', width: '100%', background: '#FEE2E2', borderRadius: '4px', marginBottom: '1rem', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: '85%', background: '#EF4444', borderRadius: '4px' }}></div>
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>85%</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '0.2rem' }}>Noise Filtered</div>
                        </div>

                        {/* Visual 2: New Leads/Count */}
                        <div style={{ background: '#fff', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', position: 'relative', left: '20px', marginBottom: '-20px' }}>
                            <div style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem' }}>Active Repositories</div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.5rem' }}>5</div>

                            {/* Tiny bars */}
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <div style={{ height: 4, flex: 1, background: '#EF4444', borderRadius: 2 }}></div>
                                <div style={{ height: 4, flex: 1, background: '#F59E0B', borderRadius: 2 }}></div>
                                <div style={{ height: 4, flex: 1, background: '#10B981', borderRadius: 2 }}></div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* Button Below */}
            <div style={{ marginTop: '4rem' }}>
                <Link href="/learn-more" style={{
                    background: '#111',
                    color: '#fff',
                    padding: '1rem 2.5rem',
                    borderRadius: '50px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'inline-block'
                }}>
                    Learn more
                </Link>
            </div>
        </section>
    );
}
