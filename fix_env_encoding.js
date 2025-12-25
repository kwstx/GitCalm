const fs = require('fs');
const path = '.env';

try {
    // Try reading as utf8 first
    let content = fs.readFileSync(path, 'utf8');

    // Check for common encoding artifacts (like lots of null bytes if it was treated as utf16)
    if (content.includes('\u0000')) {
        console.log('Detected null bytes, attempting to read as ucs2/utf16le...');
        content = fs.readFileSync(path, 'ucs2');
    }

    // Write back as utf8
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully rewrote .env as UTF-8');
} catch (e) {
    console.error('Error fixing encoding:', e);
}
