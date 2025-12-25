const { Client } = require('pg');

const password = 'abQ405%21Lm79';
const projectRef = 'wygqkubvykkxivacwrzo';
// Note: Pooler username format is often user.project_ref
const user = `postgres.${projectRef}`;

const regions = [
    'aws-0-us-east-1',
    'aws-0-eu-central-1',
    'aws-0-ap-southeast-1',
    'aws-0-eu-west-1',
    'aws-0-us-west-1',
    'aws-0-sa-east-1',
    'aws-0-ap-northeast-1',
    'aws-0-ap-northeast-2',
    'aws-0-ca-central-1',
    'aws-0-ap-south-1',
    'aws-0-eu-west-2',
    'aws-0-eu-west-3',
    'aws-0-eu-north-1'
];

async function tryRegion(region) {
    const host = `${region}.pooler.supabase.com`;
    // Port 6543 is standard for Supavisor poolers
    const connectionString = `postgresql://${user}:${password}@${host}:6543/postgres?sslmode=require`;

    console.log(`Checking ${region}...`);

    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false }, // Already set, but Node might still complain if global setting issues
        connectionTimeoutMillis: 3000
    });
    // Force Node to accept self-signed certs for this process (brute force fix)
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    try {
        await client.connect();
        console.log(`✅ FOUND REGION: ${region}`);
        await client.end();
        return connectionString;
    } catch (e) {
        if (e.message.includes('Tenant or user not found') || e.message.includes('password authentication failed')) {
            // These errors actually mean we hit the right server but maybe config is slightly off, 
            // OR we hit the wrong specific pooler instance. 
            // "Tenant not found" usually means project isn't in this region's pooler.
            console.log(`❌ ${region}: ${e.message}`);
        } else if (e.code === 'ENOTFOUND') {
            console.log(`❌ ${region}: DNS Lookup failed`);
        } else {
            console.log(`❌ ${region}: ${e.message}`);
        }
        return null;
    }
}

async function run() {
    for (const region of regions) {
        const result = await tryRegion(region);
        if (result) {
            console.log('\nSUCCESS! Use this connection string:');
            console.log(result);
            process.exit(0);
        }
    }
    console.log('\nCould not automatically determine region.');
    process.exit(1);
}

run();
