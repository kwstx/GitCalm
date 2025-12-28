
import useSWR from 'swr';
import { ProcessedEvent } from '@/lib/github/types';

interface UseGitHubEventsResult {
    events: ProcessedEvent[];
    streak: number | null; // Added streak
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

// Fetcher function that returns the full response structure
const eventsFetcher = async (url: string, { arg }: { arg: { repos: string[]; startDate?: string } }) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to fetch: ${response.statusText}`);
    }

    // Expecting { data: [...], streak: number }
    return response.json();
};

/**
 * Hook to fetch and process GitHub events for selected repositories
 */
export function useGitHubEvents(repos: string[], dateRange?: { start: Date; end: Date }): UseGitHubEventsResult {
    // SWR Key: calculated based on args
    const key = repos.length > 0 ? ['/api/github/events', { repos, startDate: dateRange?.start.toISOString() }] : null;

    const { data: responseData, error: swrError, isLoading, mutate } = useSWR(
        key,
        ([url, body]: [string, { repos: string[]; startDate?: string }]) => eventsFetcher(url, { arg: body }),
        {
            revalidateOnFocus: true,
            refreshInterval: 300000,
            dedupingInterval: 60000,
        }
    );

    return {
        events: responseData?.data || [],
        streak: responseData?.streak ?? null, // Extract streak
        loading: isLoading,
        error: swrError ? (swrError.message || 'An error occurred') : null,
        refetch: () => mutate(),
    };
}

/**
 * Hook to fetch user's GitHub repositories
 */
export function useGitHubRepos() {
    const fetcher = async (url: string) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch repos');
        return res.json();
    };

    const { data, error, isLoading } = useSWR('/api/github/repos', fetcher);

    return {
        repos: data?.repos || [],
        loading: isLoading,
        error: error ? error.message : null
    };
}
