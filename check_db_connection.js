require('dotenv').config();
const { Client } = require('pg');

async function checkConnection() {
    console.log('Testing connection to database...');
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        console.error('Error: DATABASE_URL is not defined in environment');
        process.exit(1);
    }

    // Mask password for logging
    const masked = connectionString.replace(/:([^:@]+)@/, ':****@');
    console.log(`Connecting to: ${masked}`);

    try {
        const url = new URL(connectionString);
        console.log(`Parsed Hostname: '${url.hostname}'`);
        console.log(`Parsed Port: '${url.port}'`);
    } catch (e) {
        console.error('Could not parse URL:', e.message);
    }

    const client = new Client({
        connectionString: connectionString,
        ssl: connectionString.includes('sslmode=require') ? { rejectUnauthorized: false } : false
    });

    try {
        await client.connect();
        console.log('✅ Success! Connected to database.');

        const res = await client.query('SELECT NOW() as now');
        console.log('Database time:', res.rows[0].now);

        await client.end();
        process.exit(0);
    } catch (err) {
        console.error('❌ Connection failed:', err.message);
        if (err.code) console.error('Error code:', err.code);
        process.exit(1);
    }
}

checkConnection();
