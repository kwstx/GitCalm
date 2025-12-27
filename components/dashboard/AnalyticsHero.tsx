'use client';

// Map visual labels to internal story types
type StoryType = 'success' | 'warning' | 'info';

interface AnalyticsHeroProps {
    onSelectCategory: (category: StoryType | null) => void;
    selectedCategory: StoryType | null;
    counts?: {
        success: number;
        warning: number;
        info: number;
    };
    loading?: boolean;
}

import DateRangePicker from './DateRangePicker';

import { ProcessedEvent } from '@/lib/github/types';

interface AnalyticsHeroProps {
    onSelectCategory: (category: StoryType | null) => void;
    selectedCategory: StoryType | null;
    counts?: {
        success: number;
        warning: number;
        info: number;
    };
    outcomes?: ProcessedEvent[];
    attention?: ProcessedEvent[];
    updates?: ProcessedEvent[];
    loading?: boolean;
    dateRange: { start: Date; end: Date };
    onDateChange: (start: Date, end: Date) => void;
}

export default function AnalyticsHero({
    onSelectCategory,
    selectedCategory,
    counts = { success: 0, warning: 0, info: 0 },
    outcomes = [],
    attention = [],
    updates = [],
    loading = false,
    dateRange,
    onDateChange
}: AnalyticsHeroProps) {

    const handleCategoryClick = (category: StoryType) => {
        // Toggle: if clicking the already selected one, clear it (show none? or toggle off?)
        // User said "only visible when you click", implies toggle behavior essentially showing that section.
        if (selectedCategory === category) {
            onSelectCategory(null);
        } else {
            onSelectCategory(category);
        }
    };

    const getOpacity = (category: StoryType) => {
        if (!selectedCategory) return 1; // Default state: all fully visible
        return selectedCategory === category ? 1 : 0.4; // Dim others
    };

    const getCursor = () => 'pointer';

    return (
        <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.05)',
            marginBottom: '3rem',
            fontFamily: 'sans-serif',
            position: 'relative'
        }}>
            {/* Header Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111' }}>Activity</h2>

                <div className="analytics-header-actions">
                    <a href="/dashboard/onboarding" className="add-repo-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Add Repository
                    </a>
                    <DateRangePicker startDate={dateRange.start} endDate={dateRange.end} onChange={onDateChange} />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Left: Bubble Chart Visual */}
                <div className="bubble-container" style={{ flex: 1, minWidth: 'auto', position: 'relative' }}>

                    {/* Yellow Bubble (Outcome) */}
                    <div
                        className="bubble-yellow"
                        onClick={() => handleCategoryClick('success')}
                        style={{
                            // Position handled by CSS class .bubble-yellow
                            borderRadius: '50%',
                            background: '#FCD34D',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 500,
                            color: '#111',
                            zIndex: 1,
                            cursor: getCursor(),
                            opacity: getOpacity('success'),
                            transition: 'all 0.2s',
                            overflow: 'hidden',
                            padding: '1.5rem',
                            textAlign: 'center',
                            boxShadow: selectedCategory === 'success' ? '0 10px 30px -5px rgba(251, 191, 36, 0.4)' : 'none'
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            top: '15px',
                            background: '#fff',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            zIndex: 10
                        }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B' }}></div>
                            Outcomes ({counts.success})
                        </div>

                        {loading ? (
                            <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>...</span>
                        ) : outcomes.length > 0 ? (
                            <div style={{ width: '100%', maxHeight: '140px', overflowY: 'auto', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '6px', scrollbarWidth: 'none' }}>
                                {outcomes.slice(0, 5).map(e => (
                                    <div key={e.id} style={{ fontSize: '0.75rem', lineHeight: '1.2', background: 'rgba(255,255,255,0.4)', padding: '4px 8px', borderRadius: '6px' }}>
                                        <div style={{ fontWeight: 700 }}>{e.repo}</div>
                                        <div style={{ opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.title.replace(/PR #\d+ merged: /, '')}</div>
                                    </div>
                                ))}
                                {outcomes.length > 5 && <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>+ {outcomes.length - 5} more</div>}
                            </div>
                        ) : (
                            <div style={{ opacity: 0.5, fontSize: '0.8rem' }}>No recent outcomes</div>
                        )}
                    </div>

                    {/* Red Bubble (Attention) */}
                    <div
                        className="bubble-red"
                        onClick={() => handleCategoryClick('warning')}
                        style={{
                            // Position handled by CSS class .bubble-red
                            borderRadius: '50%',
                            background: '#EF4444',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            zIndex: 2,
                            opacity: 0.95 * getOpacity('warning'),
                            cursor: getCursor(),
                            transition: 'all 0.2s',
                            padding: '1rem',
                            textAlign: 'center',
                            overflow: 'hidden',
                            boxShadow: selectedCategory === 'warning' ? '0 10px 30px -5px rgba(239, 68, 68, 0.4)' : 'none'
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            top: '15px',
                            background: '#fff',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: '#111',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            zIndex: 10
                        }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }}></div>
                            Attention ({counts.warning})
                        </div>

                        {loading ? '...' : attention.length > 0 ? (
                            <div style={{ width: '100%', maxHeight: '100px', overflowY: 'auto', marginTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '4px', scrollbarWidth: 'none' }}>
                                {attention.slice(0, 3).map(e => (
                                    <div key={e.id} style={{ fontSize: '0.7rem', lineHeight: '1.1', background: 'rgba(0,0,0,0.1)', padding: '3px 6px', borderRadius: '4px' }}>
                                        <div style={{ fontWeight: 700 }}>{e.repo}</div>
                                    </div>
                                ))}
                                {attention.length > 3 && <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>+ {attention.length - 3} more</div>}
                            </div>
                        ) : (
                            <div style={{ opacity: 0.7, fontSize: '0.75rem' }}>All good!</div>
                        )}
                    </div>

                    {/* Purple Bubble (Update) */}
                    <div
                        className="bubble-purple"
                        onClick={() => handleCategoryClick('info')}
                        style={{
                            // Position handled by CSS class .bubble-purple
                            borderRadius: '50%',
                            background: '#8B5CF6',
                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            zIndex: 3,
                            cursor: getCursor(),
                            opacity: getOpacity('info'),
                            transition: 'all 0.2s',
                            padding: '0.8rem',
                            textAlign: 'center',
                            overflow: 'hidden',
                            boxShadow: selectedCategory === 'info' ? '0 10px 30px -5px rgba(139, 92, 246, 0.4)' : 'none'
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            background: '#fff',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '10px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            color: '#111',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            zIndex: 10
                        }}>
                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#8B5CF6' }}></div>
                            Updates ({counts.info})
                        </div>

                        {loading ? '...' : updates.length > 0 ? (
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                {updates.length}
                            </div>
                        ) : <div style={{ fontSize: '1.2rem', opacity: 0.6 }}>0</div>}
                    </div>

                </div>

                {/* Right: Stats List */}
                <div className="stats-list-container" style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
                    {/* Item 1: Outcome */}
                    <div
                        className="analytics-stat-card"
                        onClick={() => handleCategoryClick('success')}
                        style={{
                            opacity: getOpacity('success'),
                        }}
                    >
                        <div style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '0.5rem' }}>Outcome</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111' }}>
                                {loading ? '...' : counts.success}
                                <span style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: 500 }}>
                                    ({Math.round((counts.success / (counts.success + counts.warning + counts.info)) * 100)}%)
                                </span>
                            </span>
                        </div>
                        <div style={{ width: '100%', height: '6px', background: '#E5E7EB', borderRadius: '3px' }}>
                            <div style={{ width: `${(counts.success / (counts.success + counts.warning + counts.info)) * 100}%`, height: '100%', background: '#FBBF24', borderRadius: '3px' }}></div>
                        </div>
                    </div>

                    {/* Item 2: Attention */}
                    <div
                        className="analytics-stat-card"
                        onClick={() => handleCategoryClick('warning')}
                        style={{
                            opacity: getOpacity('warning'),
                        }}
                    >
                        <div style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '0.5rem' }}>Attention</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111' }}>
                                {loading ? '...' : counts.warning}
                                <span style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: 500 }}>
                                    ({Math.round((counts.warning / (counts.success + counts.warning + counts.info)) * 100)}%)
                                </span>
                            </span>
                        </div>
                        <div style={{ width: '100%', height: '6px', background: '#E5E7EB', borderRadius: '3px' }}>
                            <div style={{ width: `${(counts.warning / (counts.success + counts.warning + counts.info)) * 100}%`, height: '100%', background: '#EF4444', borderRadius: '3px' }}></div>
                        </div>
                    </div>

                    {/* Item 3: Update */}
                    <div
                        className="analytics-stat-card"
                        onClick={() => handleCategoryClick('info')}
                        style={{
                            opacity: getOpacity('info'),
                        }}
                    >
                        <div style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '0.5rem' }}>Update</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111' }}>
                                {loading ? '...' : counts.info}
                                <span style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: 500 }}>
                                    ({Math.round((counts.info / (counts.success + counts.warning + counts.info)) * 100)}%)
                                </span>
                            </span>
                        </div>
                        <div style={{ width: '100%', height: '6px', background: '#E5E7EB', borderRadius: '3px', }}>
                            <div style={{ width: `${(counts.info / (counts.success + counts.warning + counts.info)) * 100}%`, height: '100%', background: '#8B5CF6', borderRadius: '3px', backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px)' }}></div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Bottom Floating Toast */}
            < div style={{
                marginTop: '1.5rem',
                background: '#F9FAFB',
                borderRadius: '50px',
                padding: '0.5rem 0.5rem 0.5rem 0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                fontSize: '0.9rem',
                color: '#374151'
            }
            }>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* User Avatars Placeholder */}
                    <div style={{ display: 'flex', marginLeft: '5px' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#E5E7EB', border: '2px solid #fff', marginLeft: '-10px', zIndex: 1 }}></div>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#D1D5DB', border: '2px solid #fff', marginLeft: '-10px', zIndex: 0 }}></div>
                    </div>
                    <strong>+14</strong> users active in the last minute!
                </div>
                <button style={{ width: 24, height: 24, borderRadius: '50%', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div >
        </div >
    );
}
