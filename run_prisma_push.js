const { spawn } = require('child_process');
require('dotenv').config();

console.log('Running prisma db push with injected environment...');
console.log('DATABASE_URL length:', process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 'undefined');

// Use cmd.exe /c to ensure PATH resolution for npx/prisma
const child = spawn('cmd.exe', ['/c', 'npx', 'prisma', 'db', 'push'], {
    stdio: 'inherit',
    env: { ...process.env }
});

child.on('exit', (code) => {
    console.log(`Prisma process exited with code ${code}`);
    process.exit(code);
});
