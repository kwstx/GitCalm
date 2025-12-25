const { Client } = require('pg');
const fs = require('fs');

const password = 'abQ405%21Lm79';
const projectRef = 'wygqkubvykkxivacwrzo';
const user = `postgres.${projectRef}`;

// Extensive list of Supabase pooler endpoints
const regions = [
    'aws-0-us-east-1', 'aws-0-us-east-2',
    'aws-0-us-west-1', 'aws-0-us-west-2',
    'aws-0-eu-central-1', 'aws-0-eu-west-1', 'aws-0-eu-west-2', 'aws-0-eu-west-3', 'aws-0-eu-north-1',
    'aws-0-ap-southeast-1', 'aws-0-ap-southeast-2',
    'aws-0-ap-northeast-1', 'aws-0-ap-northeast-2',
    'aws-0-ap-south-1',
    'aws-0-sa-east-1',
    'aws-0-ca-central-1'
];

async function checkRegion(region) {
    const host = `${region}.pooler.supabase.com`;
    const connectionString = `postgresql://${user}:${password}@${host}:6543/postgres?sslmode=require`;

    // Log intent
    fs.appendFileSync('region_scan.log', `Checking ${region}...\n`);

    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 4000
    });

    try {
        await client.connect();
        fs.appendFileSync('region_scan.log', `✅ SUCCESS: ${region}\n`);
        fs.appendFileSync('region_scan.log', `CONNECTION_STRING=${connectionString}\n`);
        await client.end();
        return connectionString;
    } catch (e) {
        let status = 'UNKNOWN_ERROR';
        if (e.message.includes('Tenant or user not found')) status = 'WRONG_REGION (Tenant missing)';
        else if (e.message.includes('password authentication failed')) status = 'RIGHT_REGION_WRONG_PASS';
        else if (e.code === 'ENOTFOUND') status = 'DNS_FAIL';
        else status = e.message;

        fs.appendFileSync('region_scan.log', `❌ ${region}: ${status}\n`);
        return null;
    }
}

async function run() {
    fs.writeFileSync('region_scan.log', 'Starting Scan...\n');

    // Ignore SSL locally
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    for (const region of regions) {
        const success = await checkRegion(region);
        if (success) break;
    }
    fs.appendFileSync('region_scan.log', 'Scan Complete.\n');
}

run();
