const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
    console.log("Testing database connection...");
    const url = process.env.DATABASE_URL;
    console.log("URL from env:", url ? "Found (Hidden)" : "Missing");

    if (!url) {
        console.error("ERROR: DATABASE_URL is missing. Check .env file.");
        return;
    }

    try {
        await prisma.$connect();
        console.log("✅ Connection SUCCESS!");

        // Try a simple query
        // Note: Using a raw query to avoid dependency on generated models if they failed
        const result = await prisma.$queryRaw`SELECT 1 as result`;
        console.log("Query result:", result);
    } catch (e) {
        console.error("❌ Connection FAILED:");
        console.error(e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
