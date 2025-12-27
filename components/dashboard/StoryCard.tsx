'use client';

type StoryType = 'success' | 'warning' | 'info';

interface StoryCardProps {
    type: StoryType;
    title: string;
    summary: string;
    timestamp: string;
    repo: string;
    impact?: string;
    priorityReason?: string;
    focusArea?: string | null; // New: Highlight matched focus area
    onClick?: () => void;
}

export default function StoryCard({ type, title, summary, timestamp, repo, impact, priorityReason, focusArea, onClick }: StoryCardProps) {

    const getTypeStyles = (t: StoryType) => {
        switch (t) {
            case 'success': return {
                glow: '0 4px 20px rgba(251, 191, 36, 0.15)', // Yellow Glow
                border: '#FCD34D',
                iconBg: '#FEF3C7',
                iconColor: '#D97706',
                gradient: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.8))',
                glowColor: 'linear-gradient(135deg, rgba(251, 191, 36, 0.4), rgba(251, 191, 36, 0))'
            };
            case 'warning': return {
                glow: '0 4px 20px rgba(239, 68, 68, 0.15)', // Red Glow
                border: '#EF4444',
                iconBg: '#FEE2E2',
                iconColor: '#DC2626',
                gradient: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.8))',
                glowColor: 'linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(239, 68, 68, 0))'
            };
            case 'info': return {
                glow: '0 4px 20px rgba(139, 92, 246, 0.15)', // Purple Glow
                border: '#8B5CF6',
                iconBg: '#EDE9FE',
                iconColor: '#7C3AED',
                gradient: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.8))',
                glowColor: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(139, 92, 246, 0))'
            };
            default: return {
                glow: 'none',
                border: '#E5E7EB',
                iconBg: '#F3F4F6',
                iconColor: '#6B7280',
                gradient: '#fff',
                glowColor: 'transparent'
            };
        }
    };

    const style = getTypeStyles(type);

    return (
        <div
            style={{
                position: 'relative',
                marginBottom: '1.5rem',
                cursor: 'pointer',
                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
            }}
            onClick={onClick}
            onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-4px) scale(1.01)';
                // Enhance the specific color glow on hover
                const glow = el.querySelector('.glow-layer');
                if (glow) {
                    glow.setAttribute('style', `
                        position: absolute; inset: -2px; border-radius: 20px; z-index: -1;
                        background: ${style.glowColor}; opacity: 0.8; filter: blur(15px); transition: opacity 0.3s;
                    `);
                }
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0) scale(1)';
                const glow = el.querySelector('.glow-layer');
                if (glow) {
                    glow.setAttribute('style', `
                        position: absolute; inset: 0; border-radius: 16px; z-index: -1;
                        background: ${style.glowColor}; opacity: 0; filter: blur(0px); transition: opacity 0.3s;
                    `);
                }
            }}
        >
            {/* Ambient Glow Layer (Hidden by default, appears on hover) */}
            <div className="glow-layer" style={{
                position: 'absolute', inset: 0, borderRadius: '16px', zIndex: -1,
                background: style.glowColor, opacity: 0, transition: 'all 0.3s'
            }}></div>

            {/* Main Glass Card */}
            <div style={{
                background: 'rgba(255, 255, 255, 0.85)', // Higher quality frosted glass
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderRadius: '16px',
                padding: '1.75rem',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: `
                    0 4px 6px -1px rgba(0, 0, 0, 0.05), 
                    0 2px 4px -1px rgba(0, 0, 0, 0.03),
                    inset 0 0 0 1px rgba(255,255,255,0.5)
                `
            }}>
                {/* Accent Line (Left Edge) */}
                <div style={{
                    position: 'absolute', left: '0', top: '20px', bottom: '20px', width: '4px',
                    background: style.border, borderRadius: '0 4px 4px 0', opacity: 0.8
                }}></div>

                {/* Meta Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingLeft: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {/* Repo Pill */}
                        <span style={{
                            fontSize: '0.75rem', fontWeight: 600, color: '#475569',
                            background: '#F8FAFC', padding: '6px 12px', borderRadius: '8px',
                            border: '1px solid #E2E8F0', letterSpacing: '-0.01em'
                        }}>
                            {repo}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>{timestamp}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {focusArea && (
                            <div
                                title="Matches your focus area"
                                style={{
                                    fontSize: '0.7rem', fontWeight: 700, color: '#fff',
                                    textTransform: 'uppercase', letterSpacing: '0.05em',
                                    background: '#4F46E5', // Solid Indigo
                                    padding: '4px 8px', borderRadius: '6px',
                                    boxShadow: '0 2px 5px rgba(79, 70, 229, 0.3)',
                                    display: 'flex', alignItems: 'center', gap: '4px'
                                }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                                {focusArea}
                            </div>
                        )}
                        {impact && (
                            <div
                                title={priorityReason}
                                style={{
                                    fontSize: '0.7rem', fontWeight: 700, color: style.iconColor,
                                    textTransform: 'uppercase', letterSpacing: '0.05em',
                                    background: style.iconBg, padding: '4px 8px', borderRadius: '6px'
                                }}>
                                {impact}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Body */}
                <div style={{ paddingLeft: '1rem' }}>
                    <h3 style={{
                        fontSize: '1.25rem', fontWeight: 700, color: '#1e293b',
                        marginBottom: '0.5rem', lineHeight: 1.3, letterSpacing: '-0.02em'
                    }}>
                        {title}
                    </h3>
                    <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.6, marginBottom: 0 }}>
                        {summary}
                    </p>
                </div>
            </div>
        </div>
    );
}
