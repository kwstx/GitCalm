'use client';
import { useState, useEffect } from 'react';
import StoryCard from './StoryCard';
import AnalyticsHero from './AnalyticsHero';
import { useGitHubEvents } from '@/lib/hooks/useGitHub';
import { ProcessedEvent } from '@/lib/github/types';

type StoryType = 'success' | 'warning' | 'info';

// Mock repos for now - in production, this would come from user preferences
const SELECTED_REPOS = [
    'vercel/next.js',
    'facebook/react',
];

export default function DailyDigest() {
    const [selectedCategory, setSelectedCategory] = useState<StoryType | null>(null);
    const { events, loading, error, refetch } = useGitHubEvents(SELECTED_REPOS);

    // Calculate category counts
    const categoryCounts = {
        success: events.filter(e => e.category === 'success').length,
        warning: events.filter(e => e.category === 'warning').length,
        info: events.filter(e => e.category === 'info').length,
    };

    // Filter events by selected category
    const filteredEvents = selectedCategory
        ? events.filter(event => event.category === selectedCategory)
        : [];

    // Format timestamp to relative time
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 60) return `${diffMins} mins ago`;
        if (diffHours < 24) return `${diffHours} hours ago`;
        return `${diffDays} days ago`;
    };

    return (
        <div>
            {/* Personalized Header */}
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    Good morning, Alex.
                </h1>
                <p style={{ fontSize: '1.1rem', color: '#64748b' }}>
                    Here is your summarized activity for <strong>today</strong>.
                </p>
            </div>

            {/* Visual Analytics Hero */}
            <AnalyticsHero
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                counts={categoryCounts}
                loading={loading}
            />

            {/* Error State */}
            {error && (
                <div style={{
                    background: '#FEE2E2',
                    border: '1px solid #EF4444',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '2rem',
                    color: '#DC2626'
                }}>
                    <strong>Error:</strong> {error}
                    <button
                        onClick={refetch}
                        style={{
                            marginLeft: '1rem',
                            background: '#EF4444',
                            color: '#fff',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Loading State */}
            {loading && !selectedCategory && (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#94a3b8' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                    Loading your activity...
                </div>
            )}

            {/* The Feed */}
            {!loading && selectedCategory ? (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                            {selectedCategory === 'success' ? 'Outcomes' : selectedCategory === 'warning' ? 'Needs Attention' : 'Updates'}
                        </h2>
                        <button
                            onClick={refetch}
                            style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, color: '#64748b', cursor: 'pointer' }}
                        >
                            🔄 Refresh
                        </button>
                    </div>

                    {filteredEvents.length > 0 ? (
                        <>
                            {filteredEvents.map(event => (
                                <StoryCard
                                    key={event.id}
                                    type={event.category}
                                    title={event.title}
                                    summary={event.summary}
                                    timestamp={formatTimestamp(event.timestamp)}
                                    repo={event.repo}
                                    impact={event.impact}
                                />
                            ))}

                            <div style={{ textAlign: 'center', marginTop: '3rem', paddingBottom: '3rem' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                                    <span>🎉 You're all caught up!</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '2px dashed #e2e8f0', borderRadius: '24px', color: '#94a3b8' }}>
                            No {selectedCategory === 'success' ? 'outcomes' : selectedCategory === 'warning' ? 'attention items' : 'updates'} found.
                        </div>
                    )}
                </div>
            ) : !loading && !selectedCategory ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '2px dashed #e2e8f0', borderRadius: '24px', color: '#94a3b8' }}>
                    Click on a chart section above to visualize the details.
                </div>
            ) : null}
        </div>
    );
}
