'use client';
import { useState, useEffect } from 'react';
import StoryCard from './StoryCard';
import AnalyticsHero from './AnalyticsHero';
import StoryModal from './StoryModal';
import { useGitHubEvents } from '@/lib/hooks/useGitHub';
import { ProcessedEvent } from '@/lib/github/types';

type StoryType = 'success' | 'warning' | 'info';

// Mock Intelligent Summaries (Fallback)
const MOCK_STORIES = [
    {
        id: 'mock-1',
        category: 'success' as const,
        repo: 'backend-api',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        title: 'Authentication Refactor Shipped Safely',
        summary: 'Merged 3 PRs migrating legacy auth flow. Tests passed with 100% coverage.',
        impact: 'Tech Debt Reduced',
        priorityReason: 'Successfully completed action'
    },
    {
        id: 'mock-2',
        category: 'warning' as const,
        repo: 'frontend-web',
        timestamp: new Date(Date.now() - 2700000).toISOString(),
        title: 'CI Build Failing on Main',
        summary: 'Latest merge introduced a linting error blocking deployment pipeline.',
        impact: 'Blocking Deploy',
        priorityReason: 'CI workflow failed on default branch'
    },
    {
        id: 'mock-3',
        category: 'info' as const,
        repo: 'design-system',
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        title: 'New "Glass" Tokens Available',
        summary: 'Updated global shadow tokens. 5 components auto-updated.',
        priorityReason: 'General update'
    },
] as any[];

export default function DailyDigest() {
    const [selectedCategory, setSelectedCategory] = useState<StoryType | null>(null);
    const [selectedStory, setSelectedStory] = useState<ProcessedEvent | null>(null);
    const [repos, setRepos] = useState<string[]>([]);
    const [reposLoading, setReposLoading] = useState(true);

    // Fetch user preference on mount
    useEffect(() => {
        console.log('[DailyDigest] Fetching user profile...');
        fetch('/api/user/profile')
            .then(res => res.json())
            .then(data => {
                console.log('[DailyDigest] Profile loaded:', data);
                if (data.selectedRepos && data.selectedRepos.length > 0) {
                    setRepos(data.selectedRepos);
                }
                setReposLoading(false);
            })
            .catch((err) => {
                console.error('[DailyDigest] Profile fetch failed:', err);
                setReposLoading(false);
            });
    }, []);

    // Date Filtering State (Default: Last 7 days)
    const [dateRange, setDateRange] = useState({
        start: new Date(new Date().setDate(new Date().getDate() - 7)),
        end: new Date()
    });

    const { events: apiEvents, loading: eventsLoading, error, refetch } = useGitHubEvents(repos, dateRange);
    const loading = reposLoading || eventsLoading;

    // Safety timeout to prevent infinite loading
    useEffect(() => {
        const timer = setTimeout(() => {
            if (loading) {
                console.warn('[DailyDigest] Fetch timed out, forcing fallback.');
                setReposLoading(false);
            }
        }, 8000); // 8 seconds timeout
        return () => clearTimeout(timer);
    }, [loading]);

    const [useDemoData, setUseDemoData] = useState(false);

    // Fallback to mock data if API fails or demo mode is active
    const rawEvents = (error || useDemoData) && apiEvents.length === 0 ? MOCK_STORIES : apiEvents;

    // Filter events by date
    const events = rawEvents.filter(e => {
        const eventDate = new Date(e.timestamp);
        return eventDate >= dateRange.start && eventDate <= dateRange.end;
    });

    // Calculate category counts based on filtered events
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
                dateRange={dateRange}
                onDateChange={(start, end) => setDateRange({ start, end })}
            />

            {/* Error State */}
            {/* Error State */}
            {error && !useDemoData && (
                <div style={{
                    background: '#FEE2E2',
                    border: '1px solid #EF4444',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '2rem',
                    color: '#DC2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <strong>Unable to fetch real data.</strong> <br />
                        <span style={{ fontSize: '0.9rem' }}>{error}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={refetch}
                            style={{
                                background: 'transparent',
                                border: '1px solid #DC2626',
                                color: '#DC2626',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Retry
                        </button>
                        <button
                            onClick={() => setUseDemoData(true)}
                            style={{
                                background: '#DC2626',
                                color: '#fff',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Show Demo Data
                        </button>
                    </div>
                </div>
            )}

            {useDemoData && (
                <div style={{
                    background: '#FFF7ED',
                    border: '1px solid #FDBA74',
                    borderRadius: '12px',
                    padding: '0.75rem 1rem',
                    marginBottom: '2rem',
                    color: '#C2410C',
                    fontSize: '0.9rem',
                    textAlign: 'center'
                }}>
                    <strong>Demo Mode Active:</strong> Showing sample data because live connection failed.
                </div>
            )}

            {/* Loading State */}
            {loading && !selectedCategory && (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#94a3b8' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                    Loading your activity...
                </div>
            )}

            {/* Empty State: No Repos Selected */}
            {!loading && !error && !useDemoData && repos.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '2px dashed #e2e8f0', borderRadius: '24px', color: '#64748b' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: '#0f172a' }}>No repositories connected</h3>
                    <p style={{ marginBottom: '1.5rem' }}>Connect your GitHub repositories to start seeing your daily digest.</p>
                    <a href="/dashboard/onboarding" style={{
                        background: '#0f172a',
                        color: '#fff',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: 600
                    }}>
                        Connect Repositories
                    </a>
                </div>
            )}

            {/* The Feed */}
            {!loading && (repos.length > 0 || useDemoData) && selectedCategory ? (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                            {selectedCategory === 'success' ? 'Outcomes' : selectedCategory === 'warning' ? 'Needs Attention' : 'Updates'}
                        </h2>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={async () => {
                                    if (!filteredEvents.length) return;

                                    const header = `# GitCalm Summary - ${new Date().toLocaleDateString()}\n\n`;
                                    const categoryHeader = `## ${selectedCategory === 'success' ? 'Outcomes' : selectedCategory === 'warning' ? 'Needs Attention' : 'Updates'}\n\n`;

                                    const content = filteredEvents.map(e =>
                                        `- **${e.repo}**: ${e.title} ${e.impact ? `[${e.impact}]` : ''}\n  ${e.summary}\n  Link: ${e.url}`
                                    ).join('\n\n');

                                    try {
                                        await navigator.clipboard.writeText(header + categoryHeader + content);
                                        alert('Summary copied to clipboard!');
                                    } catch (err) {
                                        console.error('Failed to copy', err);
                                    }
                                }}
                                style={{
                                    background: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: '#64748b',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                                Export
                            </button>
                            <button
                                onClick={refetch}
                                style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, color: '#64748b', cursor: 'pointer' }}
                            >
                                🔄 Refresh
                            </button>
                            <a href="/dashboard/onboarding" style={{
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                color: '#64748b',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                ⚙️ Manage Repos
                            </a>
                        </div>
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
                                    priorityReason={event.priorityReason}
                                    onClick={() => setSelectedStory(event)}
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

            {/* Drill-down Modal */}
            <StoryModal
                story={selectedStory}
                isOpen={!!selectedStory}
                onClose={() => setSelectedStory(null)}
            />
        </div>
    );
}
