'use client';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '95%',
            maxWidth: '1200px',
            zIndex: 100
        }}>
            <div style={{
                background: '#fff',
                borderRadius: '50px',
                padding: '0.75rem 1.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #f3f3f3'
            }}>
                {/* Logo */}
                <Link href="/" style={{
                    fontWeight: 800,
                    fontSize: '1.25rem',
                    letterSpacing: '-0.02em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#000',
                    textDecoration: 'none'
                }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                        <div style={{ width: 6, height: 6, background: '#000', borderRadius: '50%' }}></div>
                        <div style={{ width: 6, height: 6, background: '#000', borderRadius: '50%', opacity: 0.5 }}></div>
                        <div style={{ width: 6, height: 6, background: '#000', borderRadius: '50%', opacity: 0.25 }}></div>
                    </div>
                    GitCalm
                </Link>

                {/* Navigation Links - Centered */}
                {/* Navigation Links - Centered */}
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    alignItems: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: '#000'
                }}>
                    <Link href="/how-it-works" style={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>How it works</Link>
                    <Link href="#features" style={{ color: '#000', textDecoration: 'none' }}>Features</Link>
                    <Link href="#pricing" style={{ color: '#000', textDecoration: 'none' }}>Pricing</Link>
                    <Link href="#integrations" style={{ color: '#000', textDecoration: 'none' }}>Integrations</Link>
                    <Link href="#about" style={{ color: '#000', textDecoration: 'none' }}>About</Link>
                </div>

                {/* Right Actions */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {/* Search Icon */}
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', opacity: 0.6 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>

                    {/* Flag Icon (UK/US style placeholder) */}
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', fontSize: '1.2rem' }}>
                        🇬🇧
                    </button>

                    {/* CTA Button */}
                    <Link href="/login" style={{
                        background: '#111',
                        color: '#fff',
                        padding: '0.75rem 1.75rem',
                        borderRadius: '30px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        transition: 'transform 0.1s'
                    }}>
                        Try GitCalm
                    </Link>
                </div>
            </div>

            {/* Simple media query for desktop menu visibility - REMOVED for visibility */}
        </nav>
    );
}
