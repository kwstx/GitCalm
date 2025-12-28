import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

const DEFAULT_PROFILE = {
    nickname: 'User',
    plan: 'Free',
    role: 'ic', // 'ic', 'lead', 'manager'
    digestSchedule: 'morning', // 'morning', 'evening'
    focusAreas: ['security', 'performance'],
    selectedRepos: [] // Array of repo IDs
};

const DEFAULT_INTEGRATIONS = [
    { id: 'slack', name: 'Slack', description: 'Send daily digests and urgent alerts directly to your team channel.', category: 'Communication', connected: false },
    { id: 'discord', name: 'Discord', description: 'Post updates to a webhook for your community or dev team.', category: 'Communication', connected: false },
    { id: 'jira', name: 'Jira Software', description: 'Automatically create Jira tickets for high-impact issues.', category: 'Project Management', connected: false },
    { id: 'linear', name: 'Linear', description: 'Sync Priority items to your Linear board.', category: 'Project Management', connected: false }
];

// Helper to get current user ID
export async function getCurrentUserId() {
    const session = await auth();
    if (!session?.user?.email) return null;

    // In a real app with Prisma Adapter, session.user.id would be populated.
    // For now, we query by email to be safe if the adapter isn't fully synching IDs yet.
    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });

    return user?.id;
}

export async function getUserProfile() {
    const userId = await getCurrentUserId();
    if (!userId) return DEFAULT_PROFILE;

    const profile = await prisma.userProfile.findUnique({
        where: { userId }
    });

    if (!profile) {
        return DEFAULT_PROFILE;
    }

    // Transform Prisma Dates/Arrays if needed
    // Use session name as fallback if DB name is missing, or vice versa.
    // GitHub profile name is usually in session.user.name
    const session = await auth();
    const name = session?.user?.name || "User";

    return {
        name,
        nickname: profile.nickname || DEFAULT_PROFILE.nickname,
        plan: profile.plan,
        role: profile.role,
        digestSchedule: profile.digestSchedule,
        focusAreas: profile.focusAreas,
        selectedRepos: profile.selectedRepos
    };
}

interface UserProfileInput {
    nickname?: string;
    role?: string;
    digestSchedule?: string;
    focusAreas?: string[];
    selectedRepos?: string[];
}

export async function saveUserProfile(data: UserProfileInput) {
    const userId = await getCurrentUserId();
    if (!userId) throw new Error("Not authenticated");

    return prisma.userProfile.upsert({
        where: { userId },
        update: {
            nickname: data.nickname,
            role: data.role,
            digestSchedule: data.digestSchedule,
            focusAreas: data.focusAreas,
            selectedRepos: data.selectedRepos
        },
        create: {
            userId,
            nickname: data.nickname || DEFAULT_PROFILE.nickname,
            role: data.role || DEFAULT_PROFILE.role,
            digestSchedule: data.digestSchedule || DEFAULT_PROFILE.digestSchedule,
            focusAreas: data.focusAreas || DEFAULT_PROFILE.focusAreas,
            selectedRepos: data.selectedRepos || DEFAULT_PROFILE.selectedRepos
        }
    });
}

export async function getIntegrations() {
    const userId = await getCurrentUserId();
    if (!userId) return DEFAULT_INTEGRATIONS;

    // Get saved states from DB
    const savedIntegrations = await prisma.integration.findMany({
        where: { userId }
    });

    // Merge with default list to ensure UI always has the full list of available integrations
    return DEFAULT_INTEGRATIONS.map(def => {
        const saved = savedIntegrations.find(s => s.providerId === def.id);
        return {
            ...def,
            connected: saved ? saved.connected : false
        };
    });
}

export async function saveIntegration(integrationId: string, data: { connected: boolean; config?: Record<string, string> }) {
    const userId = await getCurrentUserId();
    if (!userId) throw new Error("Not authenticated");

    return prisma.integration.upsert({
        where: {
            userId_providerId: {
                userId,
                providerId: integrationId
            }
        },
        update: {
            connected: data.connected,
            config: data.config,
            updatedAt: new Date()
        },
        create: {
            userId,
            providerId: integrationId,
            connected: data.connected,
            config: data.config ?? {}
        }
    });
}
