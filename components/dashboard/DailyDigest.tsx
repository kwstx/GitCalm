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
] as ProcessedEvent[];

interface DailyDigestProps {
    initialProfile?: {
        selectedRepos?: string[];
        focusAreas?: string[];
    };
}

export default function DailyDigest({ initialProfile }: DailyDigestProps) {
    const [selectedCategory, setSelectedCategory] = useState<StoryType | null>(null);
    const [selectedStory, setSelectedStory] = useState<ProcessedEvent | null>(null);

    // Initialize state directly from props to avoid effect cascading
    const [repos, setRepos] = useState<string[]>(initialProfile?.selectedRepos || []);
    const [focusAreas, setFocusAreas] = useState<string[]>(initialProfile?.focusAreas || []);
    const [reposLoading, setReposLoading] = useState(!initialProfile);

    const [hideBots, setHideBots] = useState(false);
    const [simpleMode, setSimpleMode] = useState(false);

    // Only fetch client-side if no initial profile provided
    useEffect(() => {
        if (!initialProfile) {
            console.log('[DailyDigest] Fetching user profile (client-side fallback)...');
            fetch('/api/user/profile')
                .then(res => res.json())
                .then(data => {
                    if (data.selectedRepos) setRepos(data.selectedRepos);
                    if (data.focusAreas) setFocusAreas(data.focusAreas);
                    setReposLoading(false);
                })
                .catch(err => {
                    console.error('Profile fetch failed', err);
                    setReposLoading(false);
                });
        }
    }, [initialProfile]);

    // Date Filtering State (Default: Last 7 days)
    const [dateRange, setDateRange] = useState({
        start: new Date(new Date().setDate(new Date().getDate() - 7)),
        end: new Date()
    });

    const { events: apiEvents, streak, loading: eventsLoading, error, refetch } = useGitHubEvents(repos, dateRange);
    const loading = reposLoading || eventsLoading;

    // Safety timeout to prevent infinite loading (Legacy safety, SWR usually handles this but good to keep)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (loading) {
                console.warn('[DailyDigest] Fetch timed out, forcing fallback.');
                setReposLoading(false);
            }
        }, 8000);
        return () => clearTimeout(timer);
    }, [loading]);

    // Note: Manual Polling removed in favor of SWR's refreshInterval

    const [useDemoData, setUseDemoData] = useState(false);

    // Only use mock data if explicitly requested
    const rawEvents = useDemoData ? MOCK_STORIES : apiEvents;

    // Filter events by date and "Hide Bots" logic
    const events = rawEvents.filter(e => {
        const eventDate = new Date(e.timestamp);
        const inRange = eventDate >= dateRange.start && eventDate <= dateRange.end;

        if (!inRange) return false;

        if (hideBots) {
            const txt = (e.title + e.summary).toLowerCase();
            if (txt.includes('bot') || txt.includes('renovate') || txt.includes('dependabot')) return false;
        }

        return true;
    });


    // AI Digest State
    const [aiDigest, setAiDigest] = useState<any>(null);
    const [generatingDigest, setGeneratingDigest] = useState(false);

    const handleGenerateDigest = async () => {
        setGeneratingDigest(true);
        try {
            const res = await fetch('/api/digest/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: dateRange.end.toISOString(),
                    userContext: 'Manager' // TODO: Get from profile
                })
            });
            const { data } = await res.json();
            setAiDigest(data);
        } catch (e) {
            console.error('Failed to generate digest', e);
        } finally {
            setGeneratingDigest(false);
        }
    };

    // Filter events into categories for detailed display
    const outcomes = events.filter(e => e.category === 'success');
    const attention = events.filter(e => e.category === 'warning');
    const updates = events.filter(e => e.category === 'info');

    // Calculate category counts based on filtered events
    const categoryCounts = {
        success: outcomes.length,
        warning: attention.length,
        info: updates.length,
    };

    // Match and Sort events by Focus Areas
    // If an event matches a user's focus area (e.g. "Security"), it gets prioritized
    const getFocusMatch = (event: ProcessedEvent) => {
        if (!focusAreas || focusAreas.length === 0) return null;
        const txt = (event.title + event.summary + (event.impact || '')).toLowerCase();

        // Check for direct match of the Focus Area name (e.g. "Security")
        // Or simpler inclusion
        for (const area of focusAreas) {
            const keyword = area.split(' ')[0].toLowerCase(); // "Security & Vulnerabilities" -> "security"
            if (txt.includes(keyword)) return area;
        }
        return null;
    };


    // Filter events by selected category
    const filteredEvents = selectedCategory
        ? events.filter(event => event.category === selectedCategory)
        : [];

    // Sort: Focus Matches FIRST, then Newest
    filteredEvents.sort((a, b) => {
        const aFocus = getFocusMatch(a) ? 1 : 0;
        const bFocus = getFocusMatch(b) ? 1 : 0;
        if (aFocus !== bFocus) return bFocus - aFocus; // Focused items first
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(); // Then chronological
    });

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

    // --- GAMIFICATION: CLEAN STREAK ---
    // Use real backend streak if available, otherwise default to 0 (or 12 for demo)
    // -1 indicates "Perfect" (no failures found)
    const streakDays = useDemoData ? 12 : (streak ?? 0);
    const isStreakLoading = loading && streak === null;
    const isPerfect = streakDays === -1;

    // --- BROWSER NOTIFICATIONS ---
    const [latestSeenId, setLatestSeenId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        if (!events || events.length === 0) return;

        // Find the absolutely newest event
        const newestEvent = events[0]; // Events are sorted desc by default from API match

        if (latestSeenId && newestEvent.id !== latestSeenId) {
            // New event detected!
            if (document.hidden && newestEvent.category !== 'info') { // Only notify if tab hidden & important
                if (Notification.permission === 'granted') {
                    new Notification(`GitCalm: ${newestEvent.repo}`, {
                        body: newestEvent.title,
                        icon: '/favicon.ico' // Ensure valid path
                    });
                }
            }
        }

        // Update tracker
        if (newestEvent) {
            setLatestSeenId(newestEvent.id);
        }

    }, [events, latestSeenId]);


    return (
        <div>
            {/* Personalized Header */}
            <div className="dashboard-header">
                <div>
                    <h1 className="greeting-title">
                        Good morning, Alex.
                    </h1>
                    <p className="greeting-subtitle">
                        Here is your summarized activity for <strong>today</strong>.
                    </p>
                </div>
            </div>

            <style jsx>{`
                .dashboard-header {
                    margin-bottom: 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: end;
                    flex-direction: column; /* Mobile first: stack */
                    gap: 1rem;
                }
                .greeting-title {
                    font-size: 2rem; /* Mobile size */
                    font-weight: 800;
                    color: #0f172a;
                    margin-bottom: 0.5rem;
                    letter-spacing: -0.02em;
                    line-height: 1.1;
                }
                .greeting-subtitle {
                    font-size: 1rem;
                    color: #64748b;
                }
                
                @media (min-width: 768px) {
                    .dashboard-header {
                        margin-bottom: 3rem;
                        flex-direction: row; /* Desktop: row */
                    }
                    .greeting-title {
                        font-size: 2.5rem;
                    }
                    .greeting-subtitle {
                        font-size: 1.1rem;
                    }
                }
            `}</style>

            {/* Visual Analytics Hero */}
            <AnalyticsHero
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                counts={categoryCounts}
                outcomes={outcomes}
                attention={attention}
                updates={updates}
                loading={loading}
                dateRange={dateRange}
                onDateChange={(start, end) => setDateRange({ start, end })}
            />

            {/* AI Morning Brief Card Removed (Moved to /dashboard/briefing) */}

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
                                style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6" /><path d="M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
                                Refresh
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
                                gap: '6px'
                            }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                                Manage Repos
                            </a>

                            <button
                                onClick={() => setHideBots(!hideBots)}
                                style={{
                                    background: hideBots ? '#dbeafe' : '#f8fafc',
                                    border: `1px solid ${hideBots ? '#3b82f6' : '#e2e8f0'}`,
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: hideBots ? '#1e40af' : '#64748b',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" /></svg>
                                {hideBots ? 'Bots Hidden' : 'Show Bots'}
                            </button>

                            <button
                                onClick={() => setSimpleMode(!simpleMode)}
                                style={{
                                    background: simpleMode ? '#f8fafc' : '#dbeafe',
                                    border: `1px solid ${simpleMode ? '#e2e8f0' : '#3b82f6'}`,
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: simpleMode ? '#64748b' : '#1e40af',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                {simpleMode ? (
                                    <>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                                        Detail View
                                    </>
                                ) : (
                                    <>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                                        Simple View
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {filteredEvents.length > 0 ? (
                        <>
                            {filteredEvents.map(event => {
                                // Simple View Transformation
                                let title = event.title;
                                let summary = event.summary;
                                let timestamp = formatTimestamp(event.timestamp);

                                if (simpleMode) {
                                    // Remove "PR #123 merged: " prefix
                                    title = title.replace(/PR #\d+ merged: /, '').replace(/Issue #\d+: /, '');
                                    // Make summary concise (first sentence only)
                                    summary = summary.split('.')[0] + '.';
                                    // Simplify timestamp
                                    if (timestamp.includes('mins') || timestamp.includes('hours')) {
                                        timestamp = 'Today';
                                    }
                                }

                                return (
                                    <StoryCard
                                        key={event.id}
                                        type={event.category}
                                        title={title}
                                        summary={summary}
                                        timestamp={timestamp}
                                        repo={event.repo}
                                        impact={event.impact}
                                        priorityReason={simpleMode ? undefined : event.priorityReason}
                                        focusArea={getFocusMatch(event)}
                                        onClick={() => setSelectedStory(event)}
                                    />
                                );
                            })}

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
