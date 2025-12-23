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
export function useGitHubEvents(repos: string[]): UseGitHubEventsResult {
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
            const response = await fetch('/api/github/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ repos }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }

            const { data } = await response.json();

            // Process the data using our event processor
            const { processGitHubData, analyzePriority } = await import('@/lib/processor/events');
            const processed = processGitHubData(data);
            const analyzed = analyzePriority(processed);

            setEvents(analyzed);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error fetching GitHub events:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [repos.join(',')]); // Re-fetch when repos change

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
