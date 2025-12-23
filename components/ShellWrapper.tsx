'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";

export default function ShellWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');

    if (isDashboard) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            <main style={{ flex: 1, padding: '80px 0 0 0' }}>
                {children}
            </main>
            <FooterWrapper />
        </>
    );
}
