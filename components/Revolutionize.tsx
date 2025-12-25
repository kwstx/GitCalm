'use client';

export default function Revolutionize() {
    return (
        <section className="container" style={{
            padding: '8rem 1.5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'visible'
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>

                {/* Floating Element: Top Left - Contribution Graph */}
                <div className="card" style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-5%',
                    padding: '0.75rem',
                    width: '140px',
                    background: '#fff',
                    borderRadius: '16px',
                    transform: 'rotate(-5deg)',
                    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                        {[...Array(21)].map((_, i) => {
                            // Deterministic pseudo-random based on index to avoid hydration mismatch
                            const seed = (i * 137.508) % 1;
                            const color = seed > 0.6 ? '#10B981' : seed > 0.3 ? '#6EE7B7' : '#E5E7EB';
                            const opacity = (seed * 0.5) + 0.5;

                            return (
                                <div key={i} style={{
                                    width: '100%',
                                    paddingTop: '100%',
                                    background: color,
                                    borderRadius: '2px',
                                    opacity: opacity
                                }} />
                            );
                        })}
                    </div>
                </div>

                {/* Floating Element: Top Right - Digest Toast */}
                <div className="card" style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-5%',
                    padding: '0.6rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    borderRadius: '50px',
                    background: '#fff',
                    transform: 'rotate(3deg)',
                    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)'
                }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#444' }}>Digest Ready!</span>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                    </div>
                </div>

                {/* Floating Element: Bottom Left - Git Tags */}
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '-15%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                }}>
                    <div style={{
                        background: '#fff',
                        padding: '0.5rem 1rem',
                        borderRadius: '12px',
                        boxShadow: '0 5px 20px -5px rgba(0,0,0,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#444'
                    }}>
                        <div style={{ width: 24, height: 24, borderRadius: 4, background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="18" cy="18" r="3"></circle>
                                <circle cx="6" cy="6" r="3"></circle>
                                <path d="M6 21V9a9 9 0 0 0 9 9"></path>
                            </svg>
                        </div>
                        Merged PRs
                    </div>
                    <div style={{
                        background: '#fff',
                        padding: '0.5rem 1rem',
                        borderRadius: '12px',
                        boxShadow: '0 5px 20px -5px rgba(0,0,0,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#444',
                        marginLeft: '1.5rem'
                    }}>
                        <div style={{ width: 24, height: 24, borderRadius: 4, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="18" cy="18" r="3"></circle>
                                <circle cx="6" cy="6" r="3"></circle>
                                <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                                <line x1="6" y1="9" x2="6" y2="21"></line>
                            </svg>
                        </div>
                        Pending Reviews
                    </div>
                </div>

                {/* Main Headline */}
                <h2 style={{
                    fontSize: '3.5rem',
                    lineHeight: 1.2,
                    fontWeight: 800,
                    marginBottom: '1.5rem',
                    color: '#111'
                }}>
                    Reclaim Your <br />
                    Team's <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '0.9em',
                        height: '0.9em',
                        background: '#60A5FA',
                        borderRadius: '16px',
                        verticalAlign: 'middle',
                        margin: '0 0.2rem',
                        transform: 'rotate(10deg)',
                        color: 'white'
                    }}>
                        <svg width="0.6em" height="0.6em" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </span> <br />
                    Focus
                </h2>

                {/* Subheadline */}
                <p style={{
                    fontSize: '1.25rem',
                    lineHeight: 1.6,
                    color: '#666',
                    marginBottom: '3rem'
                }}>
                    Stop drowning in notifications. Get a clear, actionable summary of <br />
                    recent code activity, organized for your daily review.
                </p>

            </div>


        </section>
    );
}
