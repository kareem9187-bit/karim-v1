const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'src/app/admin');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(adminDir, (filePath) => {
  if (filePath.endsWith('page.tsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // Remove double padding and redundant text-white from outer wrapper
    content = content.replace(/className="p-8 max-w-4xl mx-auto text-white"/g, 'className="max-w-4xl"');
    content = content.replace(/className="p-8 max-w-5xl mx-auto text-white"/g, 'className="max-w-5xl"');
    content = content.replace(/className="p-8 max-w-6xl mx-auto text-white"/g, 'className="max-w-6xl"');
    content = content.replace(/className="p-8 mx-auto text-white"/g, 'className="max-w-4xl"');
    content = content.replace(/className="p-8 text-white"/g, 'className=""');
    
    // Sometimes there's `<form onSubmit={handleSubmit}>` wrapping Cards tightly. Add space-y-8
    content = content.replace(/<form onSubmit={handleSubmit}>/g, '<form onSubmit={handleSubmit} className="space-y-8">');
    // For cases without onSubmit but still multiple cards, or just general form wrapper
    content = content.replace(/<form action={/g, '<form className="space-y-8" action={');

    // Make the Headers cleaner
    content = content.replace(/border-b border-\[rgba\(255,255,255,0\.1\)\]/g, 'border-b border-white/5 bg-[#050505]/50');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated ${filePath}`);
    }
  }
});
