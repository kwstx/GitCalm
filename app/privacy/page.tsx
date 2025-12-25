export const metadata = {
    title: 'Privacy Policy | GitCalm',
    description: 'We do not track you.',
};

export default function PrivacyPage() {
    return (
        <div style={{ paddingBottom: '8rem', overflowX: 'hidden', background: '#fff' }}>

            {/* Hero */}
            <section style={{
                padding: '10rem 1.5rem 6rem',
                textAlign: 'center',
                background: 'radial-gradient(circle at 50% 0%, #F5F3FF, #fff 60%)' // Subtle Purple tint (matches About)
            }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{
                        display: 'inline-block',
                        background: '#DBEAFE', color: '#1E40AF', // Blue Pill (matches Features)
                        padding: '0.5rem 1rem', borderRadius: '50px',
                        fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.5rem',
                        textTransform: 'uppercase'
                    }}>
                        NO TRACKING POLICY
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginBottom: '2rem',
                        color: '#0F172A'
                    }}>
                        Your Data. <br />
                        <span style={{ color: '#3B82F6' }}>Exclusively Yours.</span>
                    </h1>
                </div>
            </section>

            {/* Content */}
            <section className="container" style={{ maxWidth: '680px', margin: '0 auto 8rem auto' }}>
                <div style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#334155' }}>
                    <p style={{ marginBottom: '2rem', fontSize: '1.4rem', fontWeight: 500, color: '#0F172A' }}>
                        GitCalm was built on a simple premise: developer tools shouldn't spy on developers.
                    </p>

                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '3rem 0 1rem', color: '#0F172A' }}>Zero Analytics</h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We do not use Google Analytics, Mixpanel, Hotjar, or any other behavioral tracking software. We don't know who you are, what pages you visit, or how long you stay.
                    </p>

                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '3rem 0 1rem', color: '#0F172A' }}>No Tracking Cookies</h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We don't use third-party tracking cookies. We only use essential first-party cookies to keep you logged in and secure your session.
                    </p>

                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '3rem 0 1rem', color: '#0F172A' }}>Data Minimization</h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We request access to your repositories solely to generate your daily digests. We process your activity data in real-time and never store your source code.
                    </p>
                </div>
            </section>

        </div>
    );
}
