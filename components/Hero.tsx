import Link from 'next/link';

export default function Hero() {
    return (
        <section className="container" style={{
            minHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: '6rem',
            paddingBottom: '12rem', // Increased padding for more spacing
            // overflow: 'hidden' removed to allow shadows
        }}>
            <div style={{ maxWidth: '900px', marginBottom: '4rem', position: 'relative', zIndex: 10 }}>
                {/* Headline */}
                <h1 style={{
                    marginBottom: '1.5rem',
                    fontSize: 'var(--font-h1)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1.1,
                    fontWeight: 800,
                    color: 'hsl(var(--foreground))'
                }}>
                    Your Projects. Your Team. <br />
                    <span style={{
                        position: 'relative',
                        display: 'inline-block',
                        zIndex: 1,
                        marginLeft: '0.2em'
                    }}>
                        One Daily Digest.
                        {/* Yellow Highlight Block */}
                        <span style={{
                            position: 'absolute',
                            bottom: '10%',
                            left: '-5%',
                            width: '110%',
                            height: '50%',
                            background: '#FCD34D', // Amber-300ish
                            zIndex: -1,
                            transform: 'rotate(-2deg)',
                            borderRadius: '4px',
                            opacity: 0.8
                        }}></span>
                    </span>
                </h1>

                {/* Subheadline */}
                <p style={{
                    fontSize: '1.25rem',
                    lineHeight: 1.6,
                    opacity: 0.6,
                    maxWidth: '540px',
                    margin: '0 auto',
                    fontWeight: 500
                }}>
                    Stop drowning in notifications. View a concise, intelligent summary of your team's GitHub activity, ready for your daily review.
                </p>

                {/* CTA */}
                <div style={{ marginTop: '2.5rem' }}>
                    <Link href="/login" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        background: '#3B82F6', // Vibrant Blue
                        color: '#fff',
                        padding: '0.8rem 2rem',
                        fontSize: '1rem',
                        borderRadius: '100px', // Pill shape
                        fontWeight: 600,
                        textDecoration: 'none',
                        boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                    }}>
                        Explore Demo
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" strokeOpacity="0.5"></circle>
                            <path d="M12 16l4-4-4-4"></path>
                            <path d="M8 12h8"></path>
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Visual Placeholder - Floating Isometric Cards */}
            <div style={{
                width: '100%',
                maxWidth: '1400px',
                height: '550px',
                position: 'relative',
                perspective: '1000px',
                marginTop: '-2rem'
            }}>
                {/* Central Card (Main) */}
                <div className="card" style={{
                    position: 'absolute',
                    top: '25%',
                    left: '50%',
                    transform: 'translateX(-50%) rotateX(35deg) rotateZ(45deg)',
                    width: '280px',
                    height: '280px',
                    background: '#fff',
                    boxShadow: '8px 8px 0px #e2e8f0, 20px 20px 60px rgba(0,0,0,0.1)',
                    zIndex: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '24px'
                }}>
                    <div style={{ width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                        {/* GitHub Logo */}
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" style={{ filter: 'drop-shadow(4px 8px 4px rgba(239, 68, 68, 0.4))' }}>
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </div>
                </div>

                {/* Left Inner Card */}
                <div className="card" style={{
                    position: 'absolute',
                    top: '5%',
                    left: '28%', // Moved inwards
                    transform: 'translateX(-50%) rotateX(35deg) rotateZ(45deg)',
                    width: '240px',
                    height: '240px',
                    background: '#fff',
                    boxShadow: '8px 8px 0px #e2e8f0, 20px 20px 50px rgba(0,0,0,0.1)',
                    zIndex: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '24px'
                }}>
                    <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
                        {/* Alert Circle */}
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ filter: 'drop-shadow(4px 8px 4px rgba(245, 158, 11, 0.4))' }}>
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
                        </svg>
                    </div>
                </div>

                {/* Right Inner Card */}
                <div className="card" style={{
                    position: 'absolute',
                    top: '5%',
                    right: '28%', // Moved inwards
                    transform: 'translateX(50%) rotateX(35deg) rotateZ(45deg)',
                    width: '240px',
                    height: '240px',
                    background: '#fff',
                    boxShadow: '8px 8px 0px #e2e8f0, 20px 20px 50px rgba(0,0,0,0.1)',
                    zIndex: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '24px'
                }}>
                    <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                        {/* Bell Icon */}
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ filter: 'drop-shadow(4px 8px 4px rgba(59, 130, 246, 0.4))' }}>
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
                            <path d="M22 17H2v-2l2-2V8C4 3.58 7.58 0 12 0s8 3.58 8 8v5l2 2v2zM12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" />
                        </svg>
                    </div>
                </div>

                {/* Left Outer Card */}
                <div className="card" style={{
                    position: 'absolute',
                    top: '-5%', // Lowered from -15%
                    left: '10%', // Fixed from 1%
                    transform: 'translateX(-50%) rotateX(35deg) rotateZ(45deg)',
                    width: '200px',
                    height: '200px',
                    background: '#fff',
                    boxShadow: '8px 8px 0px #e2e8f0, 20px 20px 40px rgba(0,0,0,0.1)',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '24px'
                }}>
                    <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899' }}>
                        {/* Git Pull Request */}
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="none" style={{ filter: 'drop-shadow(4px 8px 4px rgba(236, 72, 153, 0.4))' }}>
                            <circle cx="18" cy="18" r="3" fill="currentColor"></circle>
                            <circle cx="6" cy="6" r="3" fill="currentColor"></circle>
                            <path d="M13 6h3a2 2 0 0 1 2 2v7" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></path>
                            <line x1="6" y1="9" x2="6" y2="21" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></line>
                        </svg>
                    </div>
                </div>

                {/* Right Outer Card */}
                <div className="card" style={{
                    position: 'absolute',
                    top: '-5%', // Lowered from -15%
                    right: '10%', // Fixed from 1%
                    transform: 'translateX(50%) rotateX(35deg) rotateZ(45deg)',
                    width: '200px',
                    height: '200px',
                    background: '#fff',
                    boxShadow: '8px 8px 0px #e2e8f0, 20px 20px 40px rgba(0,0,0,0.1)',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '24px'
                }}>
                    <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FCD34D' }}>
                        {/* Check Circle */}
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ filter: 'drop-shadow(4px 8px 4px rgba(252, 211, 77, 0.4))' }}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
