'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RepoSelector from '@/components/dashboard/RepoSelector';

export default function Onboarding() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState('ic'); // 'ic', 'lead', 'manager'

    const handleContinue = () => {
        if (step === 1) {
            setStep(2);
        } else {
            // Save settings (mock) and go to dashboard
            router.push('/dashboard');
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
            {/* Step Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: step >= 1 ? '#000' : '#e2e8f0',
                    color: step >= 1 ? '#fff' : '#64748b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600
                }}>1</div>
                <div style={{ flex: 1, height: 2, background: step >= 2 ? '#000' : '#e2e8f0' }}></div>
                <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: step >= 2 ? '#000' : '#e2e8f0',
                    color: step >= 2 ? '#fff' : '#64748b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600
                }}>2</div>
            </div>

            {step === 1 && (
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>How do you work?</h1>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '2.5rem' }}>We'll tailor your daily digest based on your role.</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                        {[
                            { value: 'ic', label: 'Individual Contributor', desc: 'Focus on my PRs, code reviews, and blocking issues.' },
                            { value: 'lead', label: 'Tech Lead', desc: 'Overview of team velocity, architecture, and blockers.' },
                            { value: 'manager', label: 'Manager', desc: 'High-level summary of delivery, risks, and trends.' },
                        ].map((option) => (
                            <div
                                key={option.value}
                                onClick={() => setRole(option.value)}
                                style={{
                                    border: role === option.value ? '2px solid #000' : '1px solid #e2e8f0',
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

                    <RepoSelector />
                </div>
            )}

            <button
                onClick={handleContinue}
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
                    cursor: 'pointer',
                    marginTop: '2rem'
                }}
            >
                {step === 1 ? 'Next: Connect Repositories' : 'Finish Setup'}
            </button>
        </div>
    );
}
