const { spawn } = require('child_process');
require('dotenv').config();

console.log('Spawning prisma generate with injected environment...');
console.log('DATABASE_URL present:', !!process.env.DATABASE_URL);

const child = spawn('npx', ['prisma', 'generate'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env }
});

child.on('exit', (code) => {
    console.log(`Prisma process exited with code ${code}`);
    process.exit(code);
});
