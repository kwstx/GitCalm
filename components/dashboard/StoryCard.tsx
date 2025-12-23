'use client';

type StoryType = 'success' | 'warning' | 'info';

interface StoryCardProps {
    type: StoryType;
    title: string;
    summary: string;
    timestamp: string;
    repo: string;
    impact?: string;
}

export default function StoryCard({ type, title, summary, timestamp, repo, impact }: StoryCardProps) {

    const getTypeStyles = (t: StoryType) => {
        switch (t) {
            case 'success': return {
                glow: '0 4px 20px rgba(251, 191, 36, 0.15)', // Yellow Glow
                border: '#FCD34D',
                iconBg: '#FEF3C7',
                iconColor: '#D97706',
                gradient: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.8))'
            };
            case 'warning': return {
                glow: '0 4px 20px rgba(239, 68, 68, 0.15)', // Red Glow
                border: '#EF4444',
                iconBg: '#FEE2E2',
                iconColor: '#DC2626',
                gradient: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.8))'
            };
            case 'info': return {
                glow: '0 4px 20px rgba(139, 92, 246, 0.15)', // Purple Glow
                border: '#8B5CF6',
                iconBg: '#EDE9FE',
                iconColor: '#7C3AED',
                gradient: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.8))'
            };
            default: return {
                glow: 'none',
                border: '#E5E7EB',
                iconBg: '#F3F4F6',
                iconColor: '#6B7280',
                gradient: '#fff'
            };
        }
    };

    const style = getTypeStyles(type);

    return (
        <div style={{
            background: style.gradient,
            border: '1px solid rgba(255, 255, 255, 0.6)',
            borderLeft: `4px solid ${style.border}`, // Keep a subtle cue on the left, but refined
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '1.25rem',
            position: 'relative',
            boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.02), ${style.glow}`, // Custom colored glow
            backdropFilter: 'blur(12px)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'default'
        }}>

            {/* Meta Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Repo Pill */}
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#475569',
                        background: '#F1F5F9',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        letterSpacing: '0.02em',
                        border: '1px solid #E2E8F0'
                    }}>
                        {repo}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{timestamp}</span>
                </div>

                {impact && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: style.iconColor,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        {impact}
                    </div>
                )}
            </div>

            {/* Content Body */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                {/* Status Icon Ring */}
                <div style={{
                    marginTop: '2px',
                    width: 24, height: 24,
                    borderRadius: '50%',
                    border: `2px solid ${style.border}`,
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: style.border }}></div>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                        {title}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6 }}>
                        {summary}
                    </p>
                </div>
            </div>

            {/* Interactive Hover (CSS-in-JS style usually needs styled-components or classes, simulated here with simple style) */}
            {/* In a real app, we'd add hover states via CSS modules or Tailwind. This is "clean" static state. */}
        </div>
    );
}
