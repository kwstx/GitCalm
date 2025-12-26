import Link from 'next/link';

export default function Hero() {
    return (
        <section className="container hero-wrapper section-padding">
            <div style={{ maxWidth: '900px', marginBottom: '4rem', position: 'relative', zIndex: 10 }}>
                {/* Headline */}
                <h1 className="hero-headline">
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
                <p className="hero-subheadline">
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
            <div className="hero-cards-container">
                {/* Central Card (Main) */}
                <div className="card hero-card hero-card-main">
                    <div className="hero-icon-container-lg" style={{ color: '#ef4444' }}>
                        {/* GitHub Logo */}
                        <svg className="hero-icon-svg-lg" viewBox="0 0 98 96" fill="#ef4444" style={{ filter: 'drop-shadow(4px 8px 4px rgba(239, 68, 68, 0.4))' }}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
                        </svg>
                    </div>
                </div>

                {/* Left Inner Card */}
                <div className="card hero-card hero-card-inner-left">
                    <div className="hero-icon-container-md" style={{ color: '#F59E0B' }}>
                        {/* Alert Circle */}
                        <svg className="hero-icon-svg-md" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ filter: 'drop-shadow(4px 8px 4px rgba(245, 158, 11, 0.4))' }}>
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
                        </svg>
                    </div>
                </div>

                {/* Right Inner Card */}
                <div className="card hero-card hero-card-inner-right">
                    <div className="hero-icon-container-md" style={{ color: '#3B82F6' }}>
                        {/* Bell Icon */}
                        <svg className="hero-icon-svg-md" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ filter: 'drop-shadow(4px 8px 4px rgba(59, 130, 246, 0.4))' }}>
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
                            <path d="M22 17H2v-2l2-2V8C4 3.58 7.58 0 12 0s8 3.58 8 8v5l2 2v2zM12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" />
                        </svg>
                    </div>
                </div>

                {/* Left Outer Card */}
                <div className="card hero-card hero-card-outer-left">
                    <div className="hero-icon-container-md" style={{ color: '#EC4899' }}>
                        {/* Git Pull Request */}
                        <svg className="hero-icon-svg-md" viewBox="0 0 24 24" fill="none" stroke="none" style={{ filter: 'drop-shadow(4px 8px 4px rgba(236, 72, 153, 0.4))' }}>
                            <circle cx="18" cy="18" r="3" fill="currentColor"></circle>
                            <circle cx="6" cy="6" r="3" fill="currentColor"></circle>
                            <path d="M13 6h3a2 2 0 0 1 2 2v7" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></path>
                            <line x1="6" y1="9" x2="6" y2="21" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></line>
                        </svg>
                    </div>
                </div>

                {/* Right Outer Card */}
                <div className="card hero-card hero-card-outer-right">
                    <div className="hero-icon-container-md" style={{ color: '#FCD34D' }}>
                        {/* Check Circle */}
                        <svg className="hero-icon-svg-md" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ filter: 'drop-shadow(4px 8px 4px rgba(252, 211, 77, 0.4))' }}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
