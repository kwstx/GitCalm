'use client';

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
                    Transform Your <br />
                    Activity into <span style={{ opacity: 0.5 }}>Insights</span>
                </h2>
                <p style={{
                    fontSize: '1.1rem',
                    opacity: 0.6,
                    lineHeight: 1.6,
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    Explore how our innovative strategies and tools can seamlessly convert your chaotic logs into tangible shipping streams, driving sustainable growth for your engineering team.
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
                            103 <span style={{ fontSize: '0.9rem', color: '#888', fontWeight: 500 }}>PRs/wk</span>
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
                                <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
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
                            <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>1242</div>
                            <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>Issues Closed</div>
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Supercharge Your Velocity</h3>
                        <p style={{ fontSize: '0.95rem', opacity: 0.6, lineHeight: 1.5 }}>
                            Optimize your review cycles and reduce drag.
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
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Activity Growth Visualization</h3>
                        <p style={{ fontSize: '0.95rem', opacity: 0.6, lineHeight: 1.5 }}>
                            Visualize code churn trends and patterns to make data-driven decisions for codebase expansion.
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
                                <path d="M22 12c0 5.5-4.5 9.5-10 9.5S2 17.5 2 12 6.5 2.5 12 2.5c2.5 0 5 1 7 2.5" />
                                <path d="M22 5v5h-5" />
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
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Ship Accelerator</h3>
                        <p style={{ fontSize: '0.95rem', opacity: 0.6, lineHeight: 1.5 }}>
                            From automated summaries to AI-powered prioritization, this feature streamlines the entire workflow.
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
                            <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', opacity: 0.7 }}>Time to Ship</div>
                            <div style={{ background: '#111', color: '#fff', padding: '1rem', borderRadius: '12px', fontSize: '1.5rem', fontWeight: 700, textAlign: 'center' }}>
                                2.4d
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
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
                                <div style={{ width: 24, height: 24, background: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem' }}>AI</div>
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
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Role Segmentation</h3>
                        <p style={{ fontSize: '0.95rem', opacity: 0.6, lineHeight: 1.5 }}>
                            Effortlessly segment activity streams based on customizable roles for targeted visibility and enhanced focus.
                        </p>
                    </div>

                    {/* Stats Visuals */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'end' }}>

                        {/* Visual 1: Retention/Progress */}
                        <div style={{ background: '#fff', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                            <div style={{ height: '8px', width: '100%', background: '#FEE2E2', borderRadius: '4px', marginBottom: '1rem', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: '51%', background: '#EF4444', borderRadius: '4px' }}></div>
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>51%</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '0.2rem' }}>Noise Reduction</div>
                        </div>

                        {/* Visual 2: New Leads/Count */}
                        <div style={{ background: '#fff', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', position: 'relative', left: '20px', marginBottom: '-20px' }}>
                            <div style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem' }}>New Insights</div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.5rem' }}>342</div>

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
                <button style={{
                    background: '#111',
                    color: '#fff',
                    padding: '1rem 2.5rem',
                    borderRadius: '50px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    border: 'none',
                    cursor: 'pointer'
                }}>
                    Learn more
                </button>
            </div>
        </section>
    );
}
