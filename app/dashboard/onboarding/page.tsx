'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RepoSelector from '@/components/dashboard/RepoSelector';

export default function Onboarding() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // State form
    const [role, setRole] = useState('ic');
    const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
    const [focusAreas, setFocusAreas] = useState<string[]>([]);
    const [digestSchedule, setDigestSchedule] = useState('morning');

    useEffect(() => {
        // Load initial state
        const loadProfile = async () => {
            try {
                const res = await fetch('/api/user/profile');
                if (res.ok) {
                    const data = await res.json();
                    if (data.role) setRole(data.role);
                    if (data.selectedRepos) setSelectedRepos(data.selectedRepos);
                    if (data.focusAreas) setFocusAreas(data.focusAreas);
                    if (data.digestSchedule) setDigestSchedule(data.digestSchedule);
                }
            } catch (e) {
                console.error("Failed to load profile", e);
            }
        };
        loadProfile();
    }, []);

    const toggleRepo = (id: string) => {
        setSelectedRepos(prev =>
            prev.includes(id)
                ? prev.filter(r => r !== id)
                : [...prev, id]
        );
    };

    const toggleFocus = (area: string) => {
        setFocusAreas(prev =>
            prev.includes(area)
                ? prev.filter(a => a !== area)
                : [...prev, area]
        );
    };

    const handleContinue = async () => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            // Save settings to Backend
            setLoading(true);
            try {
                await fetch('/api/user/profile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ role, selectedRepos, focusAreas, digestSchedule })
                });
                router.push('/dashboard');
            } catch (e) {
                console.error("Failed to save onboarding", e);
                alert("Failed to save settings. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="onboarding-container">
            {/* Step Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                {[1, 2, 3, 4].map((s) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: s < 4 ? 1 : 'unset' }}>
                        <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: step >= s ? '#0f172a' : '#e2e8f0',
                            color: step >= s ? '#fff' : '#64748b',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600,
                            flexShrink: 0
                        }}>{s}</div>
                        {s < 4 && <div style={{ flex: 1, height: 2, background: step > s ? '#0f172a' : '#e2e8f0' }}></div>}
                    </div>
                ))}
            </div>

            {step === 1 && (
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>How do you work?</h1>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2.5rem' }}>We&apos;ll tailor your daily digest based on your role.</p>

                    <div className="onboarding-role-grid">
                        {[
                            { value: 'ic', label: 'Individual Contributor', desc: 'Focus on my PRs, code reviews, and blocking issues.' },
                            { value: 'lead', label: 'Tech Lead', desc: 'Overview of team velocity, architecture, and blockers.' },
                            { value: 'manager', label: 'Manager', desc: 'High-level summary of delivery, risks, and trends.' },
                        ].map((option) => (
                            <div
                                key={option.value}
                                onClick={() => setRole(option.value)}
                                style={{
                                    border: role === option.value ? '2px solid #0f172a' : '1px solid #e2e8f0',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    cursor: 'pointer',
                                    background: role === option.value ? '#fff' : '#fff',
                                    boxShadow: role === option.value ? '0 10px 20px -5px rgba(0,0,0,0.1)' : 'none',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#0f172a' }}>{option.label}</div>
                                <div style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5 }}>{option.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>Connect Repositories</h1>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '1rem' }}>Select the repositories you want to track in your digest.</p>

                    <RepoSelector selectedRepoIds={selectedRepos} onToggle={toggleRepo} />
                </div>
            )}

            {step === 3 && (
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>Focus Areas</h1>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2.5rem' }}>Select the topics you want to prioritize in your feed.</p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {[
                            'Security & Vulnerabilities',
                            'Performance',
                            'New Features',
                            'Bug Fixes',
                            'Refactoring',
                            'Documentation',
                            'CI/CD Pipelines',
                            'Design Systems'
                        ].map((area) => (
                            <div
                                key={area}
                                onClick={() => toggleFocus(area)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '50px',
                                    border: focusAreas.includes(area) ? '2px solid #0f172a' : '1px solid #e2e8f0',
                                    background: focusAreas.includes(area) ? '#0f172a' : '#fff',
                                    color: focusAreas.includes(area) ? '#fff' : '#64748b',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {area}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {step === 4 && (
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>Digest Schedule</h1>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2.5rem' }}>When would you like to receive your daily summary?</p>

                    <div className="onboarding-schedule-grid">
                        {[
                            { value: 'morning', label: 'Morning Briefing', time: '8:00 AM', desc: 'Start your day with a fresh update.' },
                            { value: 'afternoon', label: 'Afternoon Briefing', time: '2:00 PM', desc: 'Catch up after lunch with a focused summary.' },
                        ].map((option) => (
                            <div
                                key={option.value}
                                onClick={() => setDigestSchedule(option.value)}
                                style={{
                                    border: digestSchedule === option.value ? '2px solid #0f172a' : '1px solid #e2e8f0',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    cursor: 'pointer',
                                    opacity: digestSchedule === option.value ? 1 : 0.8,
                                    background: digestSchedule === option.value ? '#F8FAFC' : '#fff',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        {/* Icon */}
                                        <div style={{
                                            width: 36, height: 36, borderRadius: '10px',
                                            background: option.value === 'morning' ? '#FEF3C7' : '#EDE9FE',
                                            color: option.value === 'morning' ? '#D97706' : '#7C3AED',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            {option.value === 'morning' ? (
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                                            ) : (
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a' }}>{option.label}</div>
                                    </div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700, background: '#fff', border: '1px solid #e2e8f0', padding: '0.25rem 0.5rem', borderRadius: '8px', color: '#64748b' }}>{option.time}</div>
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#64748b', paddingLeft: 'calc(36px + 0.75rem)' }}>{option.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button
                onClick={handleContinue}
                disabled={loading}
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '1rem',
                    background: '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginTop: '3rem',
                    opacity: loading ? 0.7 : 1,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
            >
                {loading ? 'Saving...' : (step === 4 ? 'Finish Setup' : 'Continue')}
            </button>
        </div>
    );
}
