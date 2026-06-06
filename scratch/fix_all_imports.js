const fs = require('fs');

const tsxPath = 'src/app/client-page.tsx';
let lines = fs.readFileSync(tsxPath, 'utf8').split('\n');

const seenImports = new Set();
let inImportsBlock = true;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  if (line.startsWith('import ')) {
    if (seenImports.has(line)) {
      lines.splice(i, 1);
      i--;
    } else {
      seenImports.add(line);
    }
  } else if (line !== '' && line !== '"use client";' && line !== "'use client';") {
    // If we hit non-import statements, we're probably past the top-level imports block.
    // However, since we're just safely removing identical full-line imports anywhere,
    // we can continue through the whole file. But standard is top-level.
  }
}

fs.writeFileSync(tsxPath, lines.join('\n'), 'utf8');
console.log('Removed duplicate imports.');
