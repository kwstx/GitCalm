'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function SettingsPage() {
    const [isClearing, setIsClearing] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [digestFreq, setDigestFreq] = useState<'Daily' | 'Weekly'>('Daily');
    const [showToast, setShowToast] = useState(false);
    const [user, setUser] = useState({
        name: 'User Account',
        email: 'user@example.com',
        plan: 'Free'
    });

    // Initialize from LocalStorage
    useEffect(() => {
        const savedFreq = localStorage.getItem('gitcalm_digest_freq');
        if (savedFreq === 'Daily' || savedFreq === 'Weekly') {
            setTimeout(() => setDigestFreq(savedFreq), 0);
        }

        // Fetch user profile from API
        fetch('/api/user/profile')
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) {
                    setUser(prev => ({ ...prev, ...data }));
                }
            })
            .catch(err => console.error('Failed to load profile:', err));
    }, []);

    const handleClearCache = async () => {
        setIsClearing(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    };

    const handleExportData = async () => {
        setIsExporting(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        const exportData = {
            user: { ...user, joined: new Date().toISOString() },
            preferences: {
                digestFrequency: localStorage.getItem('gitcalm_digest_freq') || 'Daily',
                theme: 'system'
            },
            meta: { exportedAt: new Date().toISOString(), version: '1.0.0' }
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'gitcalm-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setIsExporting(false);
        showTemporaryToast();
    };

    const toggleDigest = () => {
        const newFreq = digestFreq === 'Daily' ? 'Weekly' : 'Daily';
        setDigestFreq(newFreq);
        localStorage.setItem('gitcalm_digest_freq', newFreq);
        showTemporaryToast();
    };

    const showTemporaryToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="settings-container">
            <h1 className="page-title">
                Settings
            </h1>
            <p className="page-subtitle">
                Manage your account, preferences, and system data.
            </p>

            {/* Toast Notification */}
            {showToast && (
                <div className="toast">
                    Successfully updated
                </div>
            )}

            <div className="settings-grid">
                {/* HERO PROFILE CARD */}
                <Link href="/dashboard/settings/profile" className="profile-card">
                    <div className="profile-bg-blob" />

                    <div className="profile-avatar">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>

                    <div className="profile-info">
                        <div className="profile-name">
                            {user.name || 'User Account'}
                        </div>
                        <div className="profile-email">
                            {user.email}
                        </div>
                        <span className="edit-badge">
                            Edit Profile
                        </span>
                    </div>
                </Link>

                {/* EXPORT DATA TILE */}
                <button
                    onClick={handleExportData}
                    className="tile tile-default"
                    disabled={isExporting}
                >
                    <div className="icon-box icon-orange">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </div>
                    <div className="tile-content">
                        <div className="tile-title">
                            {isExporting ? 'Exporting...' : 'Export Data'}
                        </div>
                        <p className="tile-desc">
                            Download your personal settings JSON.
                        </p>
                    </div>
                </button>

                {/* NOTIFICATIONS TILE */}
                <button onClick={toggleDigest} className="tile tile-default">
                    <div className="icon-box icon-purple">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    </div>
                    <div className="tile-content">
                        <div className="tile-title">
                            Notifications
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p className="tile-desc">
                                Digest Frequency
                            </p>
                            <span className="freq-badge">
                                {digestFreq}
                            </span>
                        </div>
                    </div>
                </button>

                {/* SUPPORT TILE */}
                <a href="mailto:support@gitcalm.com" className="tile tile-default" style={{ textDecoration: 'none' }}>
                    <div className="icon-box icon-green">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    </div>
                    <div className="tile-content">
                        <div className="tile-title">
                            Help & Support
                        </div>
                        <p className="tile-desc">
                            Contact our support team.
                        </p>
                    </div>
                </a>

                {/* CLEAR CACHE TILE */}
                <button
                    onClick={handleClearCache}
                    disabled={isClearing}
                    className="tile tile-default"
                >
                    <div className="icon-box icon-blue">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
                    </div>
                    <div className="tile-content">
                        <div className="tile-title">
                            {isClearing ? 'Clearing...' : 'Local Data'}
                        </div>
                        <p className="tile-desc">
                            Clear cache & reload.
                        </p>
                    </div>
                </button>

                {/* SIGN OUT TILE */}
                <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="tile tile-danger"
                >
                    <div className="icon-box icon-red">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                    </div>
                    <div className="tile-content">
                        <div className="tile-title danger-text">
                            Sign Out
                        </div>
                        <p className="tile-desc danger-subtext">
                            End session safely.
                        </p>
                    </div>
                </button>
            </div>

            <style jsx>{`
                .settings-container {
                    padding-bottom: 4rem;
                    position: relative;
                }

                .page-title {
                    font-size: 2rem; /* Mobile */
                    font-weight: 800;
                    color: #0f172a;
                    letter-spacing: -0.03em;
                    line-height: 1.1;
                }
                @media (min-width: 768px) {
                    .page-title { font-size: 2.5rem; }
                }

                .page-subtitle {
                    color: #64748b;
                    margin-top: 0.5rem;
                    font-size: 1rem;
                }
                @media (min-width: 768px) {
                    .page-subtitle { font-size: 1.1rem; }
                }

                .toast {
                    position: fixed; bottom: 2rem; right: 2rem;
                    background: #0f172a; color: #fff; padding: 0.75rem 1.5rem;
                    border-radius: 50px; box-shadow: 0 10px 30px -5px rgba(0,0,0,0.3);
                    font-weight: 600; font-size: 0.9rem; z-index: 100;
                    animation: fadeIn 0.3s ease-out;
                }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .settings-grid {
                    display: grid;
                    grid-template-columns: 1fr; /* Mobile: 1 col */
                    gap: 1rem; /* Smaller gap mobile */
                    margin-top: 2rem;
                }
                @media (min-width: 640px) {
                    .settings-grid {
                        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                        gap: 1.5rem;
                    }
                }

                /* PROFILE CARD */
                .profile-card {
                    grid-column: 1 / -1;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%);
                    backdrop-filter: blur(20px);
                    border-radius: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    padding: 1.5rem; /* Mobile padding */
                    display: flex;
                    flex-direction: column; /* Mobile stack */
                    align-items: center; /* Center on mobile */
                    gap: 1.5rem;
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
                    position: relative;
                    overflow: hidden;
                    text-decoration: none;
                    cursor: pointer;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .profile-card:hover {
                    transform: scale(1.005);
                    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.08);
                }

                @media (min-width: 768px) {
                    .profile-card {
                        padding: 2.5rem;
                        flex-direction: row; /* Desktop row */
                        align-items: center;
                        gap: 2rem;
                    }
                }

                .profile-bg-blob {
                    position: absolute; top: -50%; right: -10%; width: 350px; height: 350px;
                    background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%);
                    border-radius: 50%; pointer-events: none;
                }

                .profile-avatar {
                    width: 80px; height: 80px; 
                    border-radius: 20px;
                    background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 2rem; color: #fff; font-weight: 700;
                    box-shadow: 0 8px 20px -6px rgba(15, 23, 42, 0.25);
                    z-index: 2;
                }
                @media (min-width: 768px) {
                    .profile-avatar { width: 90px; height: 90px; font-size: 2.2rem; }
                }

                .profile-info {
                    text-align: center; /* Mobile center */
                    z-index: 2;
                }
                @media (min-width: 768px) {
                    .profile-info { text-align: left; }
                }

                .profile-name { font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.25rem; }
                @media (min-width: 768px) { .profile-name { font-size: 1.5rem; } }

                .profile-email { color: #64748b; font-size: 0.95rem; margin-bottom: 0.75rem; }
                @media (min-width: 768px) { .profile-email { font-size: 1rem; } }

                .edit-badge {
                    background: #F1F5F9; color: #475569; border: 1px solid #E2E8F0;
                    font-size: 0.75rem; font-weight: 700; padding: 6px 12px; border-radius: 100px;
                    letter-spacing: 0.04em; text-transform: uppercase;
                }

                /* TILES */
                .tile {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(12px);
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.6);
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    min-height: 180px;
                    cursor: pointer;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                    text-align: left;
                    width: 100%;
                }
                .tile:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.1);
                    border-color: rgba(99, 102, 241, 0.3);
                }

                .tile-default:disabled { opacity: 0.7; cursor: not-allowed; }

                .tile-danger { background: rgba(254, 226, 226, 0.4); border-color: #FECACA; }
                .tile-danger:hover { background: #FEF2F2; box-shadow: 0 12px 24px -10px rgba(220, 38, 38, 0.15); border-color: #EF4444; }

                .icon-box {
                    width: 48px; height: 48px; border-radius: 14px; background: #fff;
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                }
                .icon-orange { color: #F59E0B; }
                .icon-purple { color: #8B5CF6; }
                .icon-green { color: #10B981; }
                .icon-blue { color: #3B82F6; background: #EFF6FF; }
                .icon-red { background: #FEF2F2; color: #EF4444; }

                .tile-content { width: 100%; }
                .tile-title { font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-bottom: 0.25rem; }
                .tile-desc { font-size: 0.9rem; color: #64748b; }
                
                .danger-text { color: #991B1B; }
                .danger-subtext { color: #B91C1C; }

                .freq-badge {
                    font-size: 0.8rem; font-weight: 600; color: #8B5CF6;
                    background: #F3E8FF; padding: 2px 8px; border-radius: 4px;
                }
            `}</style>
        </div>
    );
}
