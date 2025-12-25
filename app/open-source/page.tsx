import Link from 'next/link';

export const metadata = {
    title: 'Open Source | GitCalm',
    description: 'GitCalm is free and open software.',
};

export default function OpenSourcePage() {
    return (
        <div style={{ paddingBottom: '8rem', overflowX: 'hidden', background: '#fff' }}>

            {/* Hero */}
            <section style={{
                padding: '10rem 1.5rem 6rem',
                textAlign: 'center',
                background: 'radial-gradient(circle at 50% 0%, #EFF6FF, #fff 60%)' // Subtle Blue tint
            }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{
                        display: 'inline-block',
                        background: '#DBEAFE', color: '#1E40AF',
                        padding: '0.5rem 1rem', borderRadius: '50px',
                        fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.5rem',
                        textTransform: 'uppercase'
                    }}>
                        MIT LICENSE
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginBottom: '2rem',
                        color: '#0F172A'
                    }}>
                        Free as in <br />
                        <span style={{ color: '#3B82F6' }}>Freedom.</span>
                    </h1>
                </div>
            </section>

            {/* Content */}
            <section className="container" style={{ maxWidth: '680px', margin: '0 auto 8rem auto' }}>
                <div style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#334155' }}>
                    <p style={{ marginBottom: '2rem', fontSize: '1.4rem', fontWeight: 500, color: '#0F172A' }}>
                        GitCalm is an open source project. We believe the best tools are built in the open.
                    </p>

                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '3rem 0 1rem', color: '#0F172A' }}>The License</h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        GitCalm is released under the <b>MIT License</b>. You are free to:
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                        {[
                            'Use the software for any purpose',
                            'Modify the source code',
                            'Distribute copies',
                            'Sublicense the software'
                        ].map((item, i) => (
                            <li key={i} style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', fontSize: '1.1rem' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.75rem', minWidth: '20px' }}>
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '3rem 0 1rem', color: '#0F172A' }}>Community Driven</h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        There is no "Enterprise/Pro" edition hidden behind a paywall. The code you see is the code we run.
                    </p>

                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                        <Link href="https://github.com/kwstx/AI-powered-GitHub-activity-digest" target="_blank" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: '#111',
                            color: '#fff',
                            textDecoration: 'none',
                            padding: '1rem 2rem',
                            borderRadius: '50px',
                            fontWeight: 600
                        }}>
                            View Source on GitHub
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
