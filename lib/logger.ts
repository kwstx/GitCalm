/**
 * Structured Logger for Security & Audit Events
 * Outputs JSON format for easy ingestion by log aggregators (Vercel, Datadog, etc.)
 */

type LogLevel = 'info' | 'warn' | 'error' | 'security';

interface LogPayload {
    event: string;
    userId?: string;
    details?: Record<string, any>;
    ip?: string;
    [key: string]: any;
}

const logger = {
    log: (level: LogLevel, payload: LogPayload) => {
        const timestamp = new Date().toISOString();
        const logEntry = JSON.stringify({
            timestamp,
            level,
            ...payload,
        });

        // In production, this would go to stdout/stderr which Vercel captures
        if (level === 'error') {
            console.error(logEntry);
        } else {
            console.log(logEntry);
        }
    },

    info: (payload: LogPayload) => logger.log('info', payload),
    warn: (payload: LogPayload) => logger.log('warn', payload),
    error: (payload: LogPayload) => logger.log('error', payload),

    // Specific Security Audit Log
    security: (payload: LogPayload) => logger.log('security', payload),
};

export default logger;
