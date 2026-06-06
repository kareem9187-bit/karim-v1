const fs = require('fs');
const html = fs.readFileSync('d:/karim/index_33.html', 'utf8');

const getSection = (startId, endId) => {
  const start = html.indexOf(`<section id="${startId}"`);
  const end = endId ? html.indexOf(`<section id="${endId}"`, start + 1) : html.indexOf('</section>', start) + 10;
  return html.substring(start, end);
};

console.log("=== TRAINING SECTION ===");
console.log(getSection('training', 'contact'));

console.log("=== CONTACT SECTION ===");
console.log(getSection('contact', null));
