'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                    <Image
                        src="/logo.svg"
                        alt="GitCalm Logo"
                        width={42}
                        height={24}
                        style={{ objectFit: 'contain' }}
                    />
                    GitCalm
                </Link>

                {/* Mobile Hamburger (Visible only on mobile) */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        display: 'none' // Default hidden (desktop)
                    }}
                >
                    {isMenuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    )}
                </button>

                {/* Desktop Links */}
                <div className="desktop-links" style={{
                    display: 'flex',
                    gap: '2rem',
                    alignItems: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: '#000'
                }}>
                    <Link href="/how-it-works" style={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>How it works</Link>
                    <Link href="/features" style={{ color: '#000', textDecoration: 'none' }}>Features</Link>
                    <Link href="/about" style={{ color: '#000', textDecoration: 'none' }}>About</Link>
                </div>

                {/* Desktop CTA */}
                <div className="desktop-cta" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: '1rem',
                    background: '#fff',
                    borderRadius: '24px',
                    padding: '1.5rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    border: '1px solid #f3f3f3',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    zIndex: 99
                }}>
                    <Link href="/how-it-works" onClick={() => setIsMenuOpen(false)} style={{ color: '#000', fontWeight: 600, textDecoration: 'none', fontSize: '1.1rem', padding: '0.5rem 0' }}>How it works</Link>
                    <Link href="/features" onClick={() => setIsMenuOpen(false)} style={{ color: '#000', textDecoration: 'none', fontSize: '1.1rem', padding: '0.5rem 0' }}>Features</Link>
                    <Link href="/about" onClick={() => setIsMenuOpen(false)} style={{ color: '#000', textDecoration: 'none', fontSize: '1.1rem', padding: '0.5rem 0' }}>About</Link>
                    <hr style={{ border: 'none', borderTop: '1px solid #f1f1f1' }} />
                    <Link href="/login" onClick={() => setIsMenuOpen(false)} style={{
                        background: '#111',
                        color: '#fff',
                        padding: '1rem',
                        borderRadius: '12px',
                        textAlign: 'center',
                        fontWeight: 600,
                        textDecoration: 'none'
                    }}>
                        Try GitCalm
                    </Link>
                </div>
            )}

            <style jsx>{`
                @media (max-width: 768px) {
                    .desktop-links, .desktop-cta {
                        display: none !important;
                    }
                    .mobile-toggle {
                        display: block !important;
                    }
                }
            `}</style>
        </nav>
    );
}
