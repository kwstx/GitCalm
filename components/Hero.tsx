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
            paddingBottom: '4rem',
            overflow: 'hidden' // For floating elements
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
                    Your Focus. Your Team. <br />
                    <span style={{
                        position: 'relative',
                        display: 'inline-block',
                        zIndex: 1,
                        marginLeft: '0.2em'
                    }}>
                        Your Sanity.
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
                    Take full control with the new GitHub intelligence platform where you can manage all your activity with ease.
                </p>

                {/* CTA */}
                <div style={{ marginTop: '2.5rem' }}>
                    <Link href="/login" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem', borderRadius: '12px', fontWeight: 600 }}>
                        Explore Demo &rarr;
                    </Link>
                </div>
            </div>

            {/* Visual Placeholder - Floating Isometric Cards */}
            <div style={{
                width: '100%',
                maxWidth: '1200px',
                height: '600px',
                position: 'relative',
                perspective: '1000px',
                marginTop: '-2rem'
            }}>
                {/* Central Card (Main) */}
                <div className="card" style={{
                    position: 'absolute',
                    top: '25%',
                    left: '50%',
                    transform: 'translateX(-50%) rotateX(55deg) rotateZ(45deg)',
                    width: '280px',
                    height: '280px',
                    background: '#fff',
                    boxShadow: '20px 20px 60px rgba(0,0,0,0.1)',
                    zIndex: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '24px'
                }}>
                    <div style={{ width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                        {/* GitHub Logo */}
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </div>
                </div>

                {/* Left Inner Card */}
                <div className="card" style={{
                    position: 'absolute',
                    top: '5%',
                    left: '30%',
                    transform: 'translateX(-50%) rotateX(55deg) rotateZ(45deg)',
                    width: '240px',
                    height: '240px',
                    background: '#fff',
                    boxShadow: '20px 20px 50px rgba(0,0,0,0.1)',
                    zIndex: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '24px'
                }}>
                    <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
                        {/* Alert Circle */}
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    </div>
                </div>

                {/* Right Inner Card */}
                <div className="card" style={{
                    position: 'absolute',
                    top: '5%',
                    right: '30%',
                    transform: 'translateX(50%) rotateX(55deg) rotateZ(45deg)',
                    width: '240px',
                    height: '240px',
                    background: '#fff',
                    boxShadow: '20px 20px 50px rgba(0,0,0,0.1)',
                    zIndex: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '24px'
                }}>
                    <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
                        {/* Bell Icon */}
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                    </div>
                </div>

                {/* Left Outer Card */}
                <div className="card" style={{
                    position: 'absolute',
                    top: '-15%',
                    left: '12%',
                    transform: 'translateX(-50%) rotateX(55deg) rotateZ(45deg)',
                    width: '200px',
                    height: '200px',
                    background: '#fff',
                    boxShadow: '20px 20px 40px rgba(0,0,0,0.1)',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '24px'
                }}>
                    <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899' }}>
                        {/* Git Pull Request */}
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="18" r="3"></circle>
                            <circle cx="6" cy="6" r="3"></circle>
                            <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                            <line x1="6" y1="9" x2="6" y2="21"></line>
                        </svg>
                    </div>
                </div>

                {/* Right Outer Card */}
                <div className="card" style={{
                    position: 'absolute',
                    top: '-15%',
                    right: '12%',
                    transform: 'translateX(50%) rotateX(55deg) rotateZ(45deg)',
                    width: '200px',
                    height: '200px',
                    background: '#fff',
                    boxShadow: '20px 20px 40px rgba(0,0,0,0.1)',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '24px'
                }}>
                    <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FCD34D' }}>
                        {/* Check Circle */}
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
