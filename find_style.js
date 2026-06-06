const fs = require('fs');
const lines = fs.readFileSync('public/custom_script.js', 'utf8').split('\n');
lines.forEach((line, i) => {
    if (line.includes('.style')) {
        console.log(`Line ${i + 1}: ${line.trim()}`);
    }
});
