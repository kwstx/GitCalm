import { useState, useEffect } from 'react';
import { ProcessedEvent } from '@/lib/github/types';

interface UseGitHubEventsResult {
    events: ProcessedEvent[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

/**
 * Hook to fetch and process GitHub events for selected repositories
 */
export function useGitHubEvents(repos: string[], dateRange?: { start: Date; end: Date }): UseGitHubEventsResult {
    const [events, setEvents] = useState<ProcessedEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEvents = async () => {
        if (!repos || repos.length === 0) {
            setEvents([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const body: any = { repos };
            if (dateRange) {
                body.startDate = dateRange.start.toISOString();
            }

            const response = await fetch('/api/github/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('[useGitHubEvents] API Error:', response.status, response.statusText, errorData);
                throw new Error(errorData.error || `Failed to fetch events: ${response.statusText}`);
            }

            const { data } = await response.json();
            console.log('[useGitHubEvents] Processed events received:', data?.length || 0);

            // Data is already processed and categorized by the server
            // Note: Server filters by 'startDate'. We could optionally filter by 'endDate' here if needed,
            // but usually we want "everything since X".
            setEvents(data || []);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An error occurred';
            setError(message);
            console.error('[useGitHubEvents] Uncaught Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [repos.join(','), dateRange?.start.toISOString()]); // Re-fetch when repos or start date changes

    return {
        events,
        loading,
        error,
        refetch: fetchEvents,
    };
}

/**
 * Hook to fetch user's GitHub repositories
 */
export function useGitHubRepos() {
    const [repos, setRepos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch('/api/github/repos');

                if (!response.ok) {
                    throw new Error('Failed to fetch repositories');
                }

                const { repos } = await response.json();
                setRepos(repos);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching repos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    return { repos, loading, error };
}
