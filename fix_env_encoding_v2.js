const fs = require('fs');
const path = '.env';

try {
    const buffer = fs.readFileSync(path);
    console.log('File size:', buffer.length);
    console.log('First 20 bytes:', buffer.subarray(0, 20));

    // Check if it starts with BOM or null bytes provided by UTF-16
    const contentStr = buffer.toString('utf8');
    if (contentStr.includes('DATABASE_URL')) {
        console.log('UTF-8 read successful. Content snippet:', contentStr.substring(0, 50));
    } else {
        console.log('UTF-8 read failed to find key. Trying UTF-16...');
        const contentUtf16 = buffer.toString('ucs2');
        if (contentUtf16.includes('DATABASE_URL')) {
            console.log('Found key in UTF-16 decode. Fixing file...');
            fs.writeFileSync(path, contentUtf16, 'utf8');
            console.log('Fixed encoding to UTF-8');
        }
    }
} catch (e) {
    console.error(e);
}
