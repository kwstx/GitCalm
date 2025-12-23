'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const navItems = [
        {
            label: 'Digest', path: '/dashboard', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
            )
        },
        {
            label: 'Integrations', path: '/dashboard/integrations', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            )
        },
        {
            label: 'Settings', path: '/dashboard/settings', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            )
        },
    ];

    return (
        <aside style={{
            width: '260px',
            height: '100vh',
            background: '#fff',
            borderRight: '1px solid #f1f5f9',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: 0,
            top: 0
        }}>
            {/* Brand */}
            <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                    <div style={{ width: 8, height: 8, background: '#000', borderRadius: '50%' }}></div>
                    <div style={{ width: 8, height: 8, background: '#000', borderRadius: '50%', opacity: 0.5 }}></div>
                    <div style={{ width: 8, height: 8, background: '#000', borderRadius: '50%', opacity: 0.25 }}></div>
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a' }}>GitCalm</span>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '0 1rem' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {navItems.map((item) => (
                        <li key={item.path} style={{ marginBottom: '0.5rem' }}>
                            <Link href={item.path} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                color: isActive(item.path) ? '#0f172a' : '#64748b',
                                background: isActive(item.path) ? '#f8fafc' : 'transparent',
                                fontWeight: isActive(item.path) ? 600 : 500,
                                transition: 'background 0.2s, color 0.2s'
                            }}>
                                <span style={{ opacity: isActive(item.path) ? 1 : 0.7 }}>{item.icon}</span>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User Profile Stub */}
            <div style={{ padding: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b' }}>U</span>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a' }}>User</div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Free Plan</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
