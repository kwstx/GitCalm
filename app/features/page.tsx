import Link from 'next/link';

export const metadata = {
    title: 'GitCalm Features',
    description: 'Explore the features that bring focus to your development workflow.',
};

export default function FeaturesPage() {
    return (
        <div style={{ paddingBottom: '8rem', overflowX: 'hidden' }}>
            {/* Unique Hero Section with Abstract Background */}
            <section style={{
                position: 'relative',
                padding: '10rem 1.5rem 8rem',
                textAlign: 'center',
                background: 'radial-gradient(circle at 50% 0%, #f0f9ff, transparent 70%)'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{
                        display: 'inline-block',
                        background: '#DBEAFE', color: '#1E40AF',
                        padding: '0.5rem 1rem', borderRadius: '50px',
                        fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.5rem'
                    }}>
                        FEATURES OVERVIEW
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                        letterSpacing: '-0.04em',
                        background: 'linear-gradient(to bottom, #111, #444)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        The toolkit for <br />
                        <span style={{ color: '#3B82F6', WebkitTextFillColor: '#3B82F6' }}>Focused Engineering.</span>
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        opacity: 0.6,
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: 1.6
                    }}>
                        Everything you need to filter the noise and ship faster, without the distraction of constant notifications.
                    </p>
                </div>
            </section>

            {/* Feature 1: The Daily Digest (Zig Layout) */}
            <section className="container" style={{ marginBottom: '8rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center'
                }}>
                    <div style={{ order: 1 }}>
                        <div style={{ fontSize: '4rem', fontWeight: 900, opacity: 0.1, lineHeight: 1, marginBottom: '1rem' }}>01</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2 }}>The Daily Digest</h2>
                        <p style={{ fontSize: '1.125rem', opacity: 0.7, lineHeight: 1.7, marginBottom: '2rem' }}>
                            Start your day with a clear, concise summary of what happened. View outcomes, attention items, and general updates in one place without digging through email.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, opacity: 0.8, lineHeight: 2 }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ color: '#2563EB' }}>✓</span> Organized by impact
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ color: '#2563EB' }}>✓</span> No spam, just updates
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ color: '#2563EB' }}>✓</span> "Pull" model (Check when you want)
                            </li>
                        </ul>
                    </div>
                    {/* Abstract Visual 1 */}
                    <div style={{ order: 2, position: 'relative' }}>
                        <div style={{
                            background: '#fff',
                            borderRadius: '24px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                            padding: '2rem',
                            transform: 'rotate(2deg)',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #f3f3f3', paddingBottom: '1rem' }}>
                                <div style={{ width: 40, height: 40, background: '#EFF6FF', borderRadius: '50%' }}></div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ width: '60%', height: 10, background: '#E5E7EB', borderRadius: 5, marginBottom: 8 }}></div>
                                    <div style={{ width: '40%', height: 10, background: '#F3F4F6', borderRadius: 5 }}></div>
                                </div>
                            </div>
                            <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <div style={{ width: '30%', height: 8, background: '#DBEAFE', borderRadius: 4 }}></div>
                                    <div style={{ width: 16, height: 16, background: '#10B981', borderRadius: '50%' }}></div>
                                </div>
                                <div style={{ width: '90%', height: 6, background: '#E5E7EB', borderRadius: 3, marginBottom: 6 }}></div>
                                <div style={{ width: '70%', height: 6, background: '#E5E7EB', borderRadius: 3 }}></div>
                            </div>
                            <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <div style={{ width: '30%', height: 8, background: '#DBEAFE', borderRadius: 4 }}></div>
                                    <div style={{ width: 16, height: 16, background: '#F59E0B', borderRadius: '50%' }}></div>
                                </div>
                                <div style={{ width: '90%', height: 6, background: '#E5E7EB', borderRadius: 3, marginBottom: 6 }}></div>
                                <div style={{ width: '40%', height: 6, background: '#E5E7EB', borderRadius: 3 }}></div>
                            </div>
                        </div>
                        {/* Circle Decor */}
                        <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, background: '#3B82F6', opacity: 0.1, borderRadius: '50%', zIndex: -1 }}></div>
                    </div>
                </div>
            </section>

            {/* Feature 2: Smart Prioritization (Zag Layout - Image Left) */}
            <section className="container" style={{ marginBottom: '8rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center'
                }}>
                    {/* Visual first on desktop concept (flipped via visual order manually for now, usually needs media query but grid-auto-flow helps. Explicit order for robust simple impl) */}
                    {/* Abstract Visual 2 */}
                    <div style={{ order: 1, position: 'relative' }}>
                        <div style={{
                            background: '#111',
                            borderRadius: '24px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                            padding: '2rem',
                            transform: 'rotate(-2deg)',
                            color: '#fff'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Priority Q</div>
                                <div style={{ background: '#DC2626', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>3 Critical</div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                                <div style={{ width: 8, height: 8, background: '#EF4444', borderRadius: '50%' }}></div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ width: '60%', height: 8, background: 'rgba(255,255,255,0.8)', borderRadius: 4, marginBottom: 4 }}></div>
                                    <div style={{ width: '40%', height: 8, background: 'rgba(255,255,255,0.3)', borderRadius: 4 }}></div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', opacity: 0.6 }}>
                                <div style={{ width: 8, height: 8, background: '#F59E0B', borderRadius: '50%' }}></div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ width: '50%', height: 8, background: 'rgba(255,255,255,0.8)', borderRadius: 4, marginBottom: 4 }}></div>
                                    <div style={{ width: '30%', height: 8, background: 'rgba(255,255,255,0.3)', borderRadius: 4 }}></div>
                                </div>
                            </div>
                        </div>
                        {/* Circle Decor */}
                        <div style={{ position: 'absolute', bottom: -30, left: -30, width: 120, height: 120, background: '#F59E0B', opacity: 0.1, borderRadius: '50%', zIndex: -1 }}></div>
                    </div>

                    <div style={{ order: 2 }}>
                        <div style={{ fontSize: '4rem', fontWeight: 900, opacity: 0.1, lineHeight: 1, marginBottom: '1rem' }}>02</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2 }}>Smart Prioritization</h2>
                        <p style={{ fontSize: '1.125rem', opacity: 0.7, lineHeight: 1.7, marginBottom: '2rem' }}>
                            Automatically highlight critical blockers and successful merges. We categorize events so you know exactly what needs your urgent attention.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, opacity: 0.8, lineHeight: 2 }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ color: '#F59E0B' }}>✓</span> Separate Signal from Noise
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ color: '#F59E0B' }}>✓</span> Blockers marked as Critical
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ color: '#F59E0B' }}>✓</span> Logic-based sorting
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Feature 3: Activity Trends (Zig Layout) */}
            <section className="container" style={{ marginBottom: '8rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center'
                }}>
                    <div style={{ order: 1 }}>
                        <div style={{ fontSize: '4rem', fontWeight: 900, opacity: 0.1, lineHeight: 1, marginBottom: '1rem' }}>03</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2 }}>Activity Breakdown</h2>
                        <p style={{ fontSize: '1.125rem', opacity: 0.7, lineHeight: 1.7, marginBottom: '2rem' }}>
                            Instantly see the balance of your team's activity. Understand the ratio of shipped features (Outcomes) vs blockers (Attention) at a glance.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, opacity: 0.8, lineHeight: 2 }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ color: '#10B981' }}>✓</span> Outcome vs Attention Ratio
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ color: '#10B981' }}>✓</span> Categorized Event Counts
                            </li>
                        </ul>
                    </div>
                    {/* Abstract Visual 3 - Bubbles/List (Matching AnalyticsHero) */}
                    <div style={{ order: 2, position: 'relative' }}>
                        <div style={{
                            background: '#fff',
                            borderRadius: '24px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                            padding: '2rem',
                            transform: 'rotate(2deg)',
                            border: '1px solid rgba(0,0,0,0.05)',
                        }}>
                            {/* Mock Stats List (Bars) */}
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', opacity: 0.6 }}><span>Outcome</span><span>65%</span></div>
                                <div style={{ width: '100%', height: 6, background: '#E5E7EB', borderRadius: 3 }}>
                                    <div style={{ width: '65%', height: '100%', background: '#FFB800', borderRadius: 3 }}></div>
                                </div>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', opacity: 0.6 }}><span>Attention</span><span>25%</span></div>
                                <div style={{ width: '100%', height: 6, background: '#E5E7EB', borderRadius: 3 }}>
                                    <div style={{ width: '25%', height: '100%', background: '#EF4444', borderRadius: 3 }}></div>
                                </div>
                            </div>

                            {/* Abstract Bubbles */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                                <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#FCD34D', opacity: 0.8 }}></div>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#EF4444', opacity: 0.8, marginTop: '20px' }}></div>
                                <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#8B5CF6', opacity: 0.8 }}></div>
                            </div>
                        </div>
                        {/* Circle Decor */}
                        <div style={{ position: 'absolute', top: 20, left: -20, width: 60, height: 60, background: '#10B981', opacity: 0.1, borderRadius: '50%', zIndex: -1 }}></div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA with Unique Gradient */}
            <section style={{
                textAlign: 'center',
                padding: '6rem 1.5rem',
                background: 'linear-gradient(135deg, #EFF6FF, #FFF)',
                borderTop: '1px solid #E5E7EB',
                borderBottom: '1px solid #E5E7EB'
            }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#1E3A8A' }}>Open & Free for Everyone.</h2>
                    <p style={{ fontSize: '1.1rem', opacity: 0.7, marginBottom: '2.5rem', lineHeight: 1.6 }}>
                        GitCalm is a free project. No hidden fees, no subscriptions. Just pure focus.
                    </p>
                    <Link href="/login" style={{
                        background: '#2563EB',
                        color: '#fff',
                        padding: '1rem 3rem',
                        borderRadius: '50px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'inline-block',
                        boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)'
                    }}>
                        Get Started
                    </Link>
                </div>
            </section>
        </div>
    );
}
