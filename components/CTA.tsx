import Link from 'next/link';

export default function CTA() {
    return (
        <section className="container" style={{ padding: '2rem 1.5rem 8rem', textAlign: 'center' }}>
            <div className="glass" style={{ padding: '5rem 2rem', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <h2 style={{ fontSize: 'var(--font-h2)', marginBottom: '1.5rem' }}>Ready to regain your focus?</h2>
                    <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Experience a calmer workflow designed for modern engineering.
                    </p>
                    <Link href="/login" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem', textDecoration: 'none' }}>
                        Get Started
                    </Link>
                </div>

                {/* Abstract background */}
                <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'hsl(var(--primary))', opacity: 0.15, filter: 'blur(100px)', borderRadius: '50%' }}></div>
            </div>
        </section>
    );
}
