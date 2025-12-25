require('dotenv').config();

const missing = [];
if (!process.env.GITHUB_ID) missing.push('GITHUB_ID');
if (!process.env.GITHUB_SECRET) missing.push('GITHUB_SECRET');

if (missing.length > 0) {
    console.log(`MISSING: ${missing.join(', ')}`);
    process.exit(1);
} else {
    console.log('AUTH_ENV_OK');
}
