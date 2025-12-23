'use client';
import { useState } from 'react';
import StoryCard from './StoryCard';
import AnalyticsHero from './AnalyticsHero';

// Mock Intelligent Summaries
const MOCK_STORIES = [
    {
        id: 1,
        type: 'success' as const,
        repo: 'backend-api',
        timestamp: '2 hours ago',
        title: 'Authentication Refactor Shipped Safely',
        summary: '3 PRs were merged into main, successfully migrating the legacy auth flow to NextAuth v5. Tests passed with 100% coverage.',
        impact: 'Tech Debt Reduced'
    },
    {
        id: 2,
        type: 'warning' as const,
        repo: 'frontend-web',
        timestamp: '45 mins ago',
        title: 'CI Build Failing on Main',
        summary: 'The latest merge introduced a linting error in `StoryCard.tsx` that is blocking the deployment pipeline.',
        impact: 'Blocking Deploy'
    },
    {
        id: 3,
        type: 'info' as const,
        repo: 'design-system',
        timestamp: '4 hours ago',
        title: 'New "Glass" Tokens Available',
        summary: 'Design team updated the global shadow and blur tokens. 5 components were automatically updated to reflect the new style.',
    },
];

type StoryType = 'success' | 'warning' | 'info';

export default function DailyDigest() {
    const [selectedCategory, setSelectedCategory] = useState<StoryType | null>(null);

    const filteredStories = selectedCategory
        ? MOCK_STORIES.filter(story => story.type === selectedCategory)
        : [];

    return (
        <div>
            {/* Personalized Header */}
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    Good morning, Alex.
                </h1>
                <p style={{ fontSize: '1.1rem', color: '#64748b' }}>
                    Here is your summarized activity for <strong>Tuesday, Oct 24</strong>.
                </p>
            </div>

            {/* Visual Analytics Hero */}
            <AnalyticsHero
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            {/* The Feed */}
            {selectedCategory ? (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                            {selectedCategory === 'success' ? 'Outcomes' : selectedCategory === 'warning' ? 'Needs Attention' : 'Updates'}
                        </h2>
                        <button style={{ background: '#f8fafc', border: 'none', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, color: '#64748b', cursor: 'pointer' }}>
                            Customize View
                        </button>
                    </div>

                    {filteredStories.map(story => (
                        <StoryCard key={story.id} {...story} />
                    ))}

                    <div style={{ textAlign: 'center', marginTop: '3rem', paddingBottom: '3rem' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                            <span>🎉 You're all caught up!</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '2px dashed #e2e8f0', borderRadius: '24px', color: '#94a3b8' }}>
                    Click on a chart section above to visualize the details.
                </div>
            )}
        </div>
    );
}
