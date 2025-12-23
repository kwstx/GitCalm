import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div style={{ minHeight: '100vh', background: '#fff' }}>
            <Sidebar />
            <main style={{ marginLeft: '260px', padding: '2rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {children}
                </div>
            </main>
        </div>
    )
}
