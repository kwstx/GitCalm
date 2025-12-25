'use client';
import { useState, useEffect } from 'react';

// Define the repo type matching the API response
interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    owner: string;
    private: boolean;
    description: string | null;
    html_url: string;
}

interface GroupedRepos {
    owner: string;
    repos: GitHubRepo[];
}

export default function RepoSelector({ selectedRepoIds, onToggle }: {
    selectedRepoIds: string[],
    onToggle: (id: string) => void
}) {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch Repositories on Mount
    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const res = await fetch('/api/github/repos');
                if (!res.ok) throw new Error('Failed to fetch repositories');

                const data = await res.json();
                setRepos(data.repos || []);
            } catch (err) {
                console.error(err);
                setError('Could not load your repositories. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    // Group repos by owner
    const groupedRepos: GroupedRepos[] = repos.reduce((groups, repo) => {
        const owner = repo.owner;
        const existingGroup = groups.find(g => g.owner === owner);
        if (existingGroup) {
            existingGroup.repos.push(repo);
        } else {
            groups.push({ owner, repos: [repo] });
        }
        return groups;
    }, [] as GroupedRepos[]);

    // Determine selection state based on props
    const getIsSelected = (repoId: string) => selectedRepoIds.includes(repoId);

    if (loading) {
        return (
            <div style={{ marginTop: '2rem', textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <svg style={{ animation: 'spin 1s linear infinite' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>
                Loading repositories from GitHub...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', color: '#B91C1C' }}>
                <p style={{ fontWeight: 600 }}>Error</p>
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#fff', border: '1px solid #FECACA', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: '#B91C1C' }}
                >
                    Retry
                </button>
            </div>
        );
    }

    if (repos.length === 0) {
        return (
            <div style={{ marginTop: '2rem', textAlign: 'center', padding: '3rem', background: '#f8fafc', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
                <p style={{ fontSize: '1.1rem', color: '#64748b', fontWeight: 500 }}>No repositories found.</p>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.5rem' }}>Are you sure you have repositories on your connected GitHub account?</p>
            </div>
        );
    }

    return (
        <div style={{ marginTop: '2rem' }}>
            {groupedRepos.map(group => (
                <div key={group.owner} style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ width: 24, height: 24, borderRadius: '4px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>
                            {group.owner.charAt(0).toUpperCase()}
                        </div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>{group.owner}</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                        {group.repos.map(repo => {
                            const repoIdStr = repo.id.toString();
                            const isSelected = getIsSelected(repoIdStr);
                            return (
                                <div
                                    key={repo.id}
                                    onClick={() => onToggle(repoIdStr)}
                                    style={{
                                        border: isSelected ? '2px solid #3B82F6' : '1px solid #e2e8f0',
                                        borderRadius: '12px',
                                        padding: '1rem',
                                        cursor: 'pointer',
                                        background: isSelected ? '#eff6ff' : '#fff',
                                        transition: 'all 0.2s',
                                        position: 'relative'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: 600, color: '#0f172a', wordBreak: 'break-all', fontSize: '0.95rem' }}>{repo.name}</span>
                                        {isSelected && (
                                            <div style={{ color: '#3B82F6', flexShrink: 0, marginLeft: '0.5rem' }}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: '#64748b', alignItems: 'center' }}>
                                        <span style={{
                                            padding: '2px 8px',
                                            background: '#f1f5f9',
                                            borderRadius: '10px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            fontWeight: 500
                                        }}>
                                            {repo.private ? 'Private' : 'Public'}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
