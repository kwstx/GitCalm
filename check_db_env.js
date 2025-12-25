require('dotenv').config();

console.log('Checking environment variables...');
if (process.env.DATABASE_URL) {
    console.log('DATABASE_URL is defined.');
    // Check if it looks like a valid connection string (basic check)
    if (process.env.DATABASE_URL.startsWith('postgres')) {
        console.log('DATABASE_URL starts with "postgres"');
    } else if (process.env.DATABASE_URL.startsWith('file')) {
        console.log('DATABASE_URL starts with "file"');
    } else {
        console.log('DATABASE_URL format unknown: ' + process.env.DATABASE_URL.substring(0, 10) + '...');
    }
} else {
    console.error('DATABASE_URL is NOT defined.');
}

if (process.env.NEXTAUTH_URL) {
    console.log('NEXTAUTH_URL is defined.');
} else {
    console.log('NEXTAUTH_URL is NOT defined.');
}
