'use client';
import { useState } from 'react';

// Mock Data
const MOCK_ORGS = [
    {
        id: 'org_1',
        name: 'acme-corp',
        avatar: 'https://github.com/github.png', // Placeholder
        repos: [
            { id: 'repo_1', name: 'backend-api', private: true, selected: true },
            { id: 'repo_2', name: 'frontend-web', private: true, selected: false },
            { id: 'repo_3', name: 'docs', private: false, selected: false },
        ]
    },
    {
        id: 'org_2',
        name: 'personal-projects',
        avatar: 'https://github.com/github.png',
        repos: [
            { id: 'repo_4', name: 'utils-lib', private: false, selected: true },
        ]
    }
];

export default function RepoSelector() {
    const [orgs, setOrgs] = useState(MOCK_ORGS);

    const toggleRepo = (orgId: string, repoId: string) => {
        setOrgs(orgs.map(org => {
            if (org.id === orgId) {
                return {
                    ...org,
                    repos: org.repos.map(repo =>
                        repo.id === repoId ? { ...repo, selected: !repo.selected } : repo
                    )
                };
            }
            return org;
        }));
    };

    return (
        <div style={{ marginTop: '2rem' }}>
            {orgs.map(org => (
                <div key={org.id} style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div style={{ width: 24, height: 24, borderRadius: '4px', background: '#e2e8f0' }}></div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>{org.name}</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                        {org.repos.map(repo => (
                            <div
                                key={repo.id}
                                onClick={() => toggleRepo(org.id, repo.id)}
                                style={{
                                    border: repo.selected ? '2px solid #3B82F6' : '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    cursor: 'pointer',
                                    background: repo.selected ? '#eff6ff' : '#fff',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{repo.name}</span>
                                    {repo.selected && (
                                        <div style={{ color: '#3B82F6' }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                    )}
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                                    <span style={{
                                        padding: '2px 8px',
                                        background: '#f1f5f9',
                                        borderRadius: '10px',
                                        display: 'inline-flex',
                                        alignItems: 'center'
                                    }}>
                                        {repo.private ? 'Private' : 'Public'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
