import DailyDigest from '@/components/dashboard/DailyDigest';
import { getUserProfile } from '@/lib/server/storage';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
    const profile = await getUserProfile();

    // Force onboarding if no repositories specificied
    // This ensures new users (or those who haven't set up) go through the flow
    if (!profile.selectedRepos || profile.selectedRepos.length === 0) {
        redirect('/dashboard/onboarding');
    }

    return (
        <DailyDigest initialProfile={profile} />
    );
}
