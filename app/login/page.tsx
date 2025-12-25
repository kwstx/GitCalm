import Link from 'next/link';
import Image from 'next/image';
import { signIn } from "@/auth";

export default function Login() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            fontFamily: 'sans-serif',
            background: '#fff'
        }}>
            {/* Left Panel - "The Calm" (Visual Showcase) */}
            <div style={{
                width: '50%',
                background: '#f8fafc', // Very subtle slate/gray
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                {/* Decorative Gradients */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '20%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(255,255,255,0) 70%)',
                    borderRadius: '50%',
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(255,255,255,0) 70%)',
                    borderRadius: '50%',
                }}></div>

                {/* Floating "Zen" Card */}
                <div className="glass-card" style={{
                    position: 'relative',
                    width: '320px',
                    aspectRatio: '3/4',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255,255,255,0.7)',
                    transform: 'rotate(-2deg)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ width: 60, height: 60, background: '#EFF6FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', margin: '0 auto' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"></path></svg>
                        </div>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Daily Digest</h3>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>Your team's velocity, blockers, and wins, summarized every morning.</p>

                    {/* Fake Stats visual */}
                    <div style={{ marginTop: '2rem', width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                            <span>Productivity</span>
                            <span>+12%</span>
                        </div>
                        <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '4px', marginBottom: '1rem' }}>
                            <div style={{ width: '75%', height: '100%', background: '#3B82F6', borderRadius: '4px' }}></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                            <span>Focus Time</span>
                            <span>4.5 hrs</span>
                        </div>
                        <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '4px' }}>
                            <div style={{ width: '60%', height: '100%', background: '#10B981', borderRadius: '4px' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - "The Interaction" */}
            <div style={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4rem',
                position: 'relative'
            }}>
                <div style={{ maxWidth: '380px', width: '100%' }}>

                    <Link href="/" style={{
                        position: 'absolute',
                        top: '2rem',
                        right: '2rem',
                        textDecoration: 'none',
                        color: '#94a3b8',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        Close <span style={{ fontSize: '1.2rem' }}>×</span>
                    </Link>

                    <div style={{ marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <Image
                                src="/logo.svg"
                                alt="GitCalm Logo"
                                width={42}
                                height={24}
                                style={{ objectFit: 'contain' }}
                            />
                            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#000' }}>GitCalm</span>
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#0f172a', lineHeight: 1.1, marginBottom: '0.75rem' }}>
                            Welcome back to flow.
                        </h1>
                        <p style={{ fontSize: '1.1rem', color: '#64748b' }}>
                            Sign in to get your team back on track.
                        </p>
                    </div>

                    <form
                        action={async () => {
                            "use server"
                            await signIn("github", { redirectTo: "/dashboard" })
                        }}
                    >
                        <button style={{
                            width: '100%',
                            padding: '1.2rem',
                            background: '#111', // Dark for the button
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            marginBottom: '2rem',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Continue with GitHub
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#94a3b8' }}>
                        By clicking continue, you acknowledge our <a href="/privacy" style={{ color: '#111', textDecoration: 'none', fontWeight: 500 }}>No Tracking Policy</a> and <a href="/open-source" style={{ color: '#111', textDecoration: 'none', fontWeight: 500 }}>Open Source License</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
