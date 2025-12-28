import { NextResponse } from 'next/server';
import { getIntegrations, saveIntegration } from '@/lib/server/storage';
import { auth } from '@/auth';
import logger from "@/lib/logger";

export async function GET() {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await getIntegrations();
        return NextResponse.json({ data });
    } catch {
        return NextResponse.json({ error: 'Failed to fetch integrations' }, { status: 500 });
    }
}

import { z } from 'zod';

const IntegrationSchema = z.object({
    id: z.string().min(1),
    connected: z.boolean(),
    config: z.record(z.string(), z.any()).optional()
});

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Input Validation
        const result = IntegrationSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: 'Invalid input', details: result.error.format() }, { status: 400 });
        }

        const { id, connected, config } = result.data;

        // Structured Audit Log
        logger.security({
            event: 'INTEGRATION_UPDATE',
            userId: session.user.id,
            details: { integrationId: id, connected }
        });

        const updated = await saveIntegration(id, { connected, config });
        return NextResponse.json({ data: updated });
    } catch (error) {
        logger.error({ event: 'INTEGRATION_UPDATE_ERROR', details: { error: String(error) } });
        return NextResponse.json({ error: 'Failed to save integration' }, { status: 500 });
    }
}
