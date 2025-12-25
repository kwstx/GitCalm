const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
    console.log("Testing database connection...");
    console.log("URL from env:", process.env.DATABASE_URL ? "Found (Hidden)" : "Missing");
    try {
        await prisma.$connect();
        console.log("✅ Connection SUCCESS!");

        // Try a simple query
        const count = await prisma.user.count();
        console.log(`Current user count: ${count}`);
    } catch (e) {
        console.error("❌ Connection FAILED:");
        console.error(e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
