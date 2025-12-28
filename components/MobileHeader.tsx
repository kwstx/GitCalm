'use client';


import Image from 'next/image';
import Link from 'next/link';

export default function MobileHeader({ onOpenSidebar }: { onOpenSidebar: () => void }) {
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
            background: '#fff',
            borderBottom: '1px solid #e2e8f0',
            position: 'sticky',
            top: 0,
            zIndex: 40,
            // Only visible on mobile (handled by media query in layout or via CSS class if we had global css)
            // Since we use inline styles, we'll rely on the parent layout to show/hide this, 
            // OR we can use a media query style block here.
        }} className="mobile-header">

            {/* Styles moved to globals.css (.mobile-header) */}

            {/* Brand */}
            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                <Image
                    src="/logo.svg"
                    alt="GitCalm Logo"
                    width={24}
                    height={24}
                    style={{ objectFit: 'contain' }}
                />
                <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a' }}>GitCalm</span>
            </Link>

            {/* Hamburger Button */}
            <button
                onClick={onOpenSidebar}
                style={{
                    background: 'transparent',
                    border: 'none',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    color: '#64748b'
                }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>
        </header>
    );
}
