const postcss = require('postcss');
const tw = require('@tailwindcss/postcss');
const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'src/app/globals.css');
const css = fs.readFileSync(cssFile, 'utf8');

console.log('Input CSS:', css);
console.log('---');

postcss([tw]).process(css, { from: cssFile }).then(r => {
  console.log('Output CSS length:', r.css.length);
  console.log('First 500 chars:');
  console.log(r.css.substring(0, 500));
  console.log('---');
  console.log('Contains .flex:', r.css.includes('.flex'));
  console.log('Contains .hidden:', r.css.includes('.hidden'));
  console.log('Contains .text-white:', r.css.includes('.text-white'));
}).catch(e => {
  console.log('ERROR:', e.message);
});
