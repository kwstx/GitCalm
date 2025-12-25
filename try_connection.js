const { Client } = require('pg');

const password = 'abQ405%21Lm79'; // User provided
const projectRef = 'wygqkubvykkxivacwrzo'; // Actual project ID
const hosts = [
    `db.${projectRef}.supabase.co`,
    `aws-0-eu-central-1.pooler.supabase.com`, // Common pooler, might be wrong region
    `aws-0-us-east-1.pooler.supabase.com`
];

async function tryConnect(host) {
    const connectionString = `postgresql://postgres:${password}@${host}:5432/postgres`;
    console.log(`Trying host: ${host}`);

    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000
    });

    try {
        await client.connect();
        console.log('✅ SUCCESS! Connected to ' + host);
        await client.end();
        return connectionString;
    } catch (e) {
        console.log(`❌ Failed ${host}: ${e.message}`);
        return null;
    }
}

async function run() {
    for (const host of hosts) {
        const success = await tryConnect(host);
        if (success) {
            console.log('VALID_CONNECTION_STRING=' + success);
            process.exit(0);
        }
    }
    console.log('All attempts failed.');
    process.exit(1);
}

run();
