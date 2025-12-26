'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div style={{ minHeight: '100vh', background: '#fff' }}>
            <MobileHeader onOpenSidebar={() => setIsSidebarOpen(true)} />

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="dashboard-main">
                <style jsx>{`
                    .dashboard-main {
                        margin-left: 260px;
                        padding: 2rem;
                    }
                    @media (max-width: 768px) {
                        .dashboard-main {
                            margin-left: 0 !important;
                            padding: 1rem;
                        }
                    }
                `}</style>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {children}
                </div>
            </main>
        </div>
    )
}
