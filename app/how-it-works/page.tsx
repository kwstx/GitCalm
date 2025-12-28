'use client';
import { useState } from 'react';
import Link from 'next/link';

import Icon87 from "@/components/icons/Icon87";

export default function HowItWorks() {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            title: "Connect Your Repos",
            description: "Securely authorize GitCalm with your GitHub organization. We only ask for read-access to metadata, keeping your code secure."
        },
        {
            title: "Customize Filters",
            description: "Tell us what matters. Toggle off dependabot alerts, ignore typo fixes, and highlight specific directories or labels."
        },
        {
            title: "Receive Daily Digest",
            description: "Every morning at 9 AM, get a concise email or Slack summary of yesterday's velocity, blocked PRs, and critical discussions."
        },
        {
            title: "Ship with Confidence",
            description: "Use your new visibility to unblock peers faster and spend your standup talking about strategy, not status updates."
        }
    ];

    return (
        <section style={{
            minHeight: '100vh',
            background: 'hsl(var(--background))', // Match global site background
            color: '#111',
            fontFamily: 'sans-serif',
            paddingTop: '6rem'
        }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 4rem 1.5rem' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '1rem' }}>How It Works</h1>
                    <p style={{ fontSize: '1.1rem', color: '#666' }}>From setup to everyday flow, we&apos;ve made summarization effortless.</p>
                </div>

                <div className="how-it-works-grid">

                    {/* Left: Dynamic Visual (The "Phone" / Card) */}
                    <div className="device-sticky-wrapper">
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.5)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '40px',
                            padding: '2rem',
                            aspectRatio: '1/1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.4), 0 10px 30px rgba(0,0,0,0.05)'
                        }}>
                            {/* The "Device" Card */}
                            <div className="glass-card" style={{
                                background: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: '24px',
                                width: '100%',
                                maxWidth: '300px',
                                height: '500px',
                                padding: '2rem',
                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                transition: 'all 0.3s ease'
                            }}>
                                {/* Visual Content based on activeStep */}
                                {activeStep === 0 && (
                                    <>
                                        <div style={{ width: 80, height: 80, background: '#1a1a1a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        </div>
                                        <h3 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Connect GitHub</h3>
                                        <Icon87 width={120} height={120} />
                                    </>
                                )}
                                {activeStep === 1 && (
                                    <>
                                        <div style={{ width: '100%', padding: '0 1rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                                                <span>Dependabot</span>
                                                <div style={{ width: 40, height: 24, background: '#e5e7eb', borderRadius: 20, position: 'relative' }}><div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, left: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}></div></div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                                                <span style={{ fontWeight: 600 }}>Merge Commits</span>
                                                <div style={{ width: 40, height: 24, background: '#3B82F6', borderRadius: 20, position: 'relative', boxShadow: '0 0 15px rgba(59, 130, 246, 0.6)' }}><div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, right: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}></div></div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontWeight: 600 }}>Typos</span>
                                                <div style={{ width: 40, height: 24, background: '#e5e7eb', borderRadius: 20, position: 'relative' }}><div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, left: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}></div></div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {activeStep === 2 && (
                                    <>
                                        <div style={{ width: '100%', background: '#f3f4f6', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                                            <div style={{ width: '40%', height: '8px', background: '#d1d5db', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
                                            <div style={{ width: '80%', height: '8px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
                                            <div style={{ width: '60%', height: '8px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                                        </div>
                                        <div style={{ width: '100%', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }}></div>
                                                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Blocked: API Refactor</span>
                                            </div>
                                            <div style={{ width: '90%', height: '6px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                                        </div>
                                    </>
                                )}
                                {activeStep === 3 && (
                                    <>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#000', marginBottom: '0.5rem', position: 'relative', display: 'inline-block', zIndex: 1 }}>
                                                +24%
                                                <span style={{
                                                    position: 'absolute',
                                                    bottom: '10%',
                                                    left: '-5%',
                                                    width: '110%',
                                                    height: '50%',
                                                    background: '#FCD34D',
                                                    zIndex: -1,
                                                    transform: 'rotate(-2deg)',
                                                    borderRadius: '4px',
                                                    opacity: 0.8
                                                }}></span>
                                            </div>
                                            <p style={{ fontSize: '0.9rem', color: '#111', fontWeight: 600 }}>Velocity Increase</p>
                                            <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end', justifyContent: 'center', height: '60px', marginTop: '2rem', filter: 'drop-shadow(0 8px 16px rgba(16, 185, 129, 0.4))' }}>
                                                <div style={{ width: '10px', height: '30%', background: '#d1d5db', borderRadius: '2px' }}></div>
                                                <div style={{ width: '10px', height: '50%', background: '#d1d5db', borderRadius: '2px' }}></div>
                                                <div style={{ width: '10px', height: '40%', background: '#d1d5db', borderRadius: '2px' }}></div>
                                                <div style={{ width: '10px', height: '70%', background: '#10B981', borderRadius: '2px' }}></div>
                                                <div style={{ width: '10px', height: '60%', background: '#10B981', borderRadius: '2px' }}></div>
                                                <div style={{ width: '10px', height: '90%', background: '#10B981', borderRadius: '2px' }}></div>
                                            </div>
                                        </div>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>

                    {/* Right: Accordion Steps */}
                    <div style={{ paddingTop: '2rem', position: 'relative', zIndex: 10 }}>
                        {steps.map((step, index) => (
                            <div key={index} style={{ borderBottom: '1px solid #e5e7eb', marginBottom: '1.5rem', paddingBottom: '1.5rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setActiveStep(index)}
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        fontSize: '1.25rem',
                                        fontWeight: 600,
                                        color: activeStep === index ? '#111' : '#9ca3af',
                                        transition: 'color 0.2s'
                                    }}
                                >
                                    <span>Step {index + 1}: {step.title}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', transform: activeStep === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', pointerEvents: 'none' }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </span>
                                </button>
                                {activeStep === index && (
                                    <div style={{ marginTop: '1rem', fontSize: '1.1rem', lineHeight: 1.6, color: '#4b5563', animation: 'fadeIn 0.3s' }}>
                                        {step.description}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div style={{ marginTop: '3rem' }}>
                            <Link href="/login" style={{
                                background: '#3B82F6',
                                color: '#fff',
                                padding: '1rem 2.5rem',
                                borderRadius: '50px',
                                fontSize: '1rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                                display: 'inline-block'
                            }}>
                                Start now
                            </Link>
                            <span style={{ marginLeft: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
                                ⏱ 2 mins to complete setup
                            </span>
                        </div>

                    </div>

                </div>
            </div>
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
