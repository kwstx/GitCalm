'use client';

import { ProcessedEvent } from '@/lib/github/types';
import { useEffect, useState } from 'react';

interface StoryModalProps {
    story: ProcessedEvent | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function StoryModal({ story, isOpen, onClose }: StoryModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Delay visibility state to allow mount then animate
            const t = setTimeout(() => {
                setIsVisible(true);
                document.body.style.overflow = 'hidden';
            }, 10);
            return () => clearTimeout(t);
        } else {
            setTimeout(() => setIsVisible(false), 0); // Start exit animation
            const timer = setTimeout(() => {
                document.body.style.overflow = '';
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!story && !isVisible) return null;
    if (!story && isVisible) return null; // Should ideally keep showing old story during exit animation but simplifying for now

    const getBorderColor = (category: string) => {
        switch (category) {
            case 'success': return '#FCD34D';
            case 'warning': return '#EF4444';
            case 'info': return '#8B5CF6';
            default: return '#E5E7EB';
        }
    };

    const getBgColor = (category: string) => {
        switch (category) {
            case 'success': return '#FEF3C7';
            case 'warning': return '#FEE2E2';
            case 'info': return '#EDE9FE';
            default: return '#F3F4F6';
        }
    };

    const color = getBorderColor(story!.category);
    const bg = getBgColor(story!.category);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: isOpen ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out'
        }}>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(15, 23, 42, 0.4)',
                    backdropFilter: 'blur(4px)'
                }}
            />

            {/* Modal Content */}
            <div style={{
                background: '#fff',
                width: '100%',
                maxWidth: '600px',
                borderRadius: '24px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                position: 'relative',
                zIndex: 10,
                transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>

                {/* Header */}
                <div style={{ padding: '2rem', borderBottom: '1px solid #f1f5f9', background: 'linear-gradient(to bottom, #ffffff, #fafafa)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                        <span style={{
                            fontSize: '0.75rem', fontWeight: 600, color: '#475569',
                            background: '#F1F5F9', padding: '4px 12px', borderRadius: '20px',
                            border: '1px solid #E2E8F0'
                        }}>
                            {story!.repo}
                        </span>
                        <button
                            onClick={onClose}
                            style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: '#94a3b8', cursor: 'pointer', lineHeight: 1 }}
                        >
                            &times;
                        </button>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.25, marginBottom: '0.5rem' }}>
                        {story!.title}
                    </h2>
                    <p style={{ fontSize: '1rem', color: '#64748b' }}>{story!.summary}</p>
                </div>

                {/* Body */}
                <div style={{ padding: '2rem' }}>

                    {/* Priority / Why Section */}
                    <div style={{
                        background: bg,
                        border: `1px solid ${color}30`,
                        borderRadius: '12px',
                        padding: '1rem',
                        marginBottom: '2rem',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'start'
                    }}>
                        <div style={{ fontSize: '1.5rem' }}>
                            {story!.category === 'success' ? '✅' : story!.category === 'warning' ? '⚠️' : 'ℹ️'}
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                                Reason for Priority
                            </div>
                            <div style={{ color: '#475569', fontSize: '0.95rem' }}>
                                {story!.priorityReason}
                            </div>
                        </div>
                    </div>

                    {/* Timeline (Mocked for now as we don't have deeper data yet) */}
                    <div style={{ position: 'relative', paddingLeft: '1rem' }}>
                        <div style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '2px', background: '#e2e8f0' }}></div>

                        <div style={{ marginBottom: '1.5rem', position: 'relative', paddingLeft: '1.5rem' }}>
                            <div style={{ width: '10px', height: '10px', background: '#cbd5e1', borderRadius: '50%', position: 'absolute', left: '-4px', top: '6px' }}></div>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                                {new Date(story!.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div style={{ fontSize: '0.95rem', color: '#334155' }}>
                                Event triggered on GitHub ({story!.type})
                            </div>
                        </div>

                        <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
                            <div style={{ width: '10px', height: '10px', background: color, borderRadius: '50%', position: 'absolute', left: '-4px', top: '6px' }}></div>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                                Recent Activity
                            </div>
                            <div style={{ fontSize: '0.95rem', color: '#334155' }}>
                                <a href={story!.url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 500 }}>
                                    View Source on GitHub &rarr;
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button
                        onClick={onClose}
                        style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}
                    >
                        Dismiss
                    </button>
                    <a
                        href={story!.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', background: '#0f172a', color: '#fff', fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}
                    >
                        Open on GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}
