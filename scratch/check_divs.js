const fs = require('fs');
const lines = fs.readFileSync('src/app/client-page.tsx', 'utf8').split('\n');
let divCount = 0;
let mainOpen = false;
for(let i=0; i<lines.length; i++) {
  if(lines[i].includes('<main')) { mainOpen = true; divCount=0; }
  if(mainOpen) {
    divCount += (lines[i].match(/<div[^>]*>/g) || []).length;
    divCount -= (lines[i].match(/<\/div>/g) || []).length;
  }
  if(lines[i].includes('id="welcome-section"') || lines[i].includes('id="portfolioContent"') || lines[i].includes('id="contact"')) {
    console.log((i+1) + ': ' + lines[i].trim() + ' (balance: ' + divCount + ')');
  }
}
