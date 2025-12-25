'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditProfilePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: 'User Account',
        email: 'user@example.com',
        nickname: 'user123',
        avatarUrl: '',
        plan: 'Free' // mocking plan for preview
    });

    useEffect(() => {
        // Load existing data from API
        fetch('/api/user/profile')
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) {
                    setFormData(prev => ({ ...prev, ...data }));
                }
            })
            .catch(err => console.error('Failed to load profile:', err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/user/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Failed to save');

            setIsLoading(false);
            router.push('/dashboard/settings');
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            alert('Failed to save profile');
        }
    };

    // --- Styles Match Settings Page ---
    const pageContainerStyle = {
        paddingBottom: '4rem',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '4rem',
        alignItems: 'start'
    };

    // Card Style (Identical to Settings Page for consistency)
    const profileCardStyle = {
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        padding: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
        position: 'relative' as const,
        overflow: 'hidden',
        transition: 'all 0.3s ease'
    };

    const inputStyle = {
        width: '100%',
        padding: '1rem',
        borderRadius: '12px',
        border: '1px solid rgba(203, 213, 225, 0.6)',
        fontSize: '1rem',
        color: '#0f172a',
        outline: 'none',
        background: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.2s',
        marginBottom: '1.5rem',
        fontWeight: 500
    };

    const labelStyle = {
        display: 'block', marginBottom: '0.6rem', fontWeight: 600, color: '#475569', fontSize: '0.9rem', letterSpacing: '0.02em', textTransform: 'uppercase' as const
    };

    return (
        <div style={pageContainerStyle}>
            {/* Left Column: Editor */}
            <div>
                <Link
                    href="/dashboard/settings"
                    style={{ color: '#64748b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.95rem', fontWeight: 600, transition: 'color 0.2s' }}
                >
                    <span style={{ fontSize: '1.2em', lineHeight: 1 }}>←</span> Back to Settings
                </Link>

                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
                    Edit Profile
                </h1>
                <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                    Customize how you appear across GitCalm. <br /> Changes are reflected immediately in your dashboard.
                </p>

                <form onSubmit={handleSubmit} style={{
                    padding: '2rem',
                    borderRadius: '24px',
                    background: 'rgba(255, 255, 255, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div>
                        <label style={labelStyle}>Display Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                            placeholder="e.g. Jane Doe"
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(203, 213, 225, 0.6)'}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                            placeholder="e.g. user@example.com"
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(203, 213, 225, 0.6)'}
                        />
                    </div>

                    {/* Button Group */}
                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                        <Link
                            href="/dashboard/settings"
                            style={{
                                flex: 1, textAlign: 'center', padding: '1rem', borderRadius: '100px',
                                border: '1px solid #e2e8f0', background: 'transparent', color: '#64748b',
                                fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s'
                            }}
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                flex: 2, padding: '1rem', borderRadius: '100px',
                                background: '#0f172a', color: '#fff', border: 'none',
                                fontWeight: 700, cursor: isLoading ? 'not-allowed' : 'pointer',
                                opacity: isLoading ? 0.8 : 1, transition: 'all 0.2s',
                                boxShadow: '0 10px 20px -5px rgba(15, 23, 42, 0.3)'
                            }}
                        >
                            {isLoading ? 'Saving Changes...' : 'Save Profile'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Right Column: Live Preview & Context */}
            <div style={{ paddingTop: '8rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{
                    textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700,
                    color: '#94a3b8', fontSize: '0.85rem', paddingLeft: '0.5rem'
                }}>
                    Live Card Preview
                </div>

                {/* LIVE PREVIEW CARD */}
                <div style={profileCardStyle}>
                    {/* Background Bloom */}
                    <div style={{
                        position: 'absolute', top: '-50%', right: '-10%', width: '350px', height: '350px',
                        background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%)',
                        borderRadius: '50%', pointerEvents: 'none'
                    }} />

                    {/* Avatar Preview */}
                    <div style={{
                        width: 90, height: 90, borderRadius: '20px',
                        background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2.2rem', color: '#fff', fontWeight: 700,
                        boxShadow: '0 8px 20px -6px rgba(15, 23, 42, 0.25)',
                        position: 'relative'
                    }}>
                        {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
                        {/* Edit Badge */}
                        <div style={{
                            position: 'absolute', bottom: -5, right: -5,
                            background: '#3b82f6', color: '#fff', borderRadius: '50%',
                            width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '3px solid #fff', fontSize: '0.8rem'
                        }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </div>
                    </div>

                    {/* Text Preview */}
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
                            {formData.name || 'Your Name'}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '1rem', marginBottom: '0.75rem' }}>
                            {formData.email || 'your@email.com'}
                        </div>
                        <span style={{
                            background: '#F1F5F9', color: '#475569',
                            fontSize: '0.75rem', fontWeight: 700,
                            padding: '6px 12px', borderRadius: '100px',
                            letterSpacing: '0.04em', textTransform: 'uppercase',
                            border: '1px solid #E2E8F0'
                        }}>
                            Member
                        </span>
                    </div>
                </div>

                <div style={{
                    background: 'rgba(59, 130, 246, 0.05)', borderRadius: '16px', padding: '1.5rem',
                    border: '1px solid rgba(59, 130, 246, 0.1)', color: '#334155', fontSize: '0.95rem',
                    lineHeight: '1.6'
                }}>
                    <strong style={{ color: '#1d4ed8', display: 'block', marginBottom: '0.5rem' }}>Did you know?</strong>
                    Your profile information is currently stored locally in your browser for privacy. In a future update, this will sync with your GitHub account directly.
                </div>
            </div>
        </div>
    );
}
