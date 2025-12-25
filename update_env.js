const fs = require('fs');
const content = `DATABASE_URL="postgresql://postgres.wygqkubvykkxivacwrzo:abQ405%21Lm79@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="secret"
`;
fs.writeFileSync('.env', content, 'utf8');
console.log('Updated .env');
