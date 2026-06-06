const fs = require('fs');
const lines = fs.readFileSync('src/app/client-page.tsx', 'utf8').split('\n');

let spaNavbarCount = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('import { SpaNavbar } from')) {
    spaNavbarCount++;
    if (spaNavbarCount > 1) {
      lines.splice(i, 1);
      i--;
    }
  }
}

fs.writeFileSync('src/app/client-page.tsx', lines.join('\n'), 'utf8');
console.log('Removed duplicate SpaNavbar imports.');
