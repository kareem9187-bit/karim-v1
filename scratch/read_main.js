const fs = require('fs');
const lines = fs.readFileSync('../index_33.html', 'utf8').split('\n');
const start = lines.findIndex(l => l.includes('<main'));
const end = lines.findIndex(l => l.includes('portfolio-content'));
console.log(lines.slice(start, end).join('\n'));
