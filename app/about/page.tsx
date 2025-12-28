import Link from 'next/link';

export const metadata = {
    title: 'About GitCalm',
    description: 'The story behind the tool that brings focus to engineering teams.',
};

export default function AboutPage() {
    return (
        <div style={{ paddingBottom: '8rem', overflowX: 'hidden', background: '#fff' }}>

            {/* Hero: Stark & Bold */}
            <section style={{
                padding: '12rem 1.5rem 6rem',
                textAlign: 'center',
                background: 'radial-gradient(circle at 50% 0%, #F5F3FF, #fff 60%)' // Very subtle purple tint
            }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{
                        display: 'inline-block',
                        background: '#DBEAFE', color: '#1E40AF',
                        padding: '0.5rem 1rem', borderRadius: '50px',
                        fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.5rem',
                        textTransform: 'uppercase'
                    }}>
                        The GitCalm Philosophy
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        fontWeight: 800,
                        lineHeight: 1.05,
                        marginBottom: '2rem',
                        letterSpacing: '-0.03em',
                        color: '#0F172A'
                    }}>
                        Less Noise. <br />
                        <span style={{ color: '#3B82F6' }}>More Signal.</span>
                    </h1>
                </div>
            </section>

            {/* The Story - Single Column, Blog Style */}
            <section className="container" style={{ maxWidth: '680px', margin: '0 auto 8rem auto' }}>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.6, marginBottom: '2rem', color: '#334155', fontWeight: 500 }}>
                    We realized we were spending more time clearing notifications than writing code.
                </p>
                <div style={{ fontSize: '1.15rem', lineHeight: 1.8, color: '#475569' }}>
                    <p style={{ marginBottom: '2rem' }}>
                        It starts with a few GitHub emails. Then a Slack ping. Then a Jira ticket update. Before you know it, your morning blocked off for &quot;Deep Work&quot; is gone.
                    </p>
                    <p style={{ marginBottom: '2rem' }}>
                        Modern development tools are incredible, but they&apos;re also <b>noisy</b>. They&apos;re designed to demand your attention immediately, regardless of whether it&apos;s actually urgent.
                    </p>
                    <p style={{ marginBottom: '2rem' }}>
                        We built GitCalm to be the shield. It monitors your repositories and highlights high-priority items—filtering the noise so you see only what actually matters.
                    </p>
                </div>
            </section>

            {/* Principles - Horizontal Grid (Glass) */}
            <section style={{ background: '#F8FAFC', padding: '8rem 1.5rem' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A' }}>Our Core Principles</h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {/* Principle 1 */}
                        <div style={{ background: '#fff', padding: '3rem', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
                            <div style={{
                                width: 50, height: 50, background: '#F3E8FF', borderRadius: '12px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
                                color: '#7C3AED'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#1E293B' }}>Respect Focus</h3>
                            <p style={{ lineHeight: 1.6, color: '#64748B' }}>
                                A tool should never interrupt a human unless it&apos;s critical. Asynchronous by default.
                            </p>
                        </div>

                        {/* Principle 2 */}
                        <div style={{ background: '#fff', padding: '3rem', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
                            <div style={{
                                width: 50, height: 50, background: '#ECFDF5', borderRadius: '12px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
                                color: '#059669'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#1E293B' }}>Privacy First</h3>
                            <p style={{ lineHeight: 1.6, color: '#64748B' }}>
                                Your data is yours. We don&apos;t track your behavior, sell your metrics, or train models on your code.
                            </p>
                        </div>

                        {/* Principle 3 */}
                        <div style={{ background: '#fff', padding: '3rem', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
                            <div style={{
                                width: 50, height: 50, background: '#EFF6FF', borderRadius: '12px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
                                color: '#2563EB'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#1E293B' }}>Simplicity Wins</h3>
                            <p style={{ lineHeight: 1.6, color: '#64748B' }}>
                                No complex dashboards to configure. No training required. It just works, quietly in the background.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Link */}
            <section style={{ textAlign: 'center', padding: '6rem 1.5rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', color: '#0F172A' }}>Ready to reclaim your time?</h2>
                <Link href="/login" style={{
                    background: '#111',
                    color: '#fff',
                    padding: '1rem 3rem',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-block',
                }}>
                    Get Started for Free
                </Link>
            </section>

        </div>
    );
}
