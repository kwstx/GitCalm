'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
    const pathname = usePathname();

    // Hide footer on specific paths
    // Hide footer on specific paths
    if (pathname === '/learn-more' || pathname === '/how-it-works' || pathname === '/features' || pathname === '/about') {
        return null;
    }

    return <Footer />;
}
