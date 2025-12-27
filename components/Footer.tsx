import Link from 'next/link';
// Re-trigger build

export default function Footer() {
    return (
        <footer style={{
            padding: '3rem 0',
            borderTop: '1px solid var(--border)',
            background: 'var(--card-bg)',
            marginTop: 'auto'
        }}>
            <div className="container footer-container">
                <p>&copy; {new Date().getFullYear()} GitCalm. Built as a free project.</p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link href="/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>No Tracking</Link>
                    <Link href="/open-source" style={{ textDecoration: 'none', color: 'inherit' }}>Open Source</Link>
                    <Link href="https://github.com/kwstx/AI-powered-GitHub-activity-digest" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>GitHub</Link>
                </div>
            </div>
        </footer>
    );
}
