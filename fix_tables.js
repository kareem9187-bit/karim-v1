const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('src/app/admin');
let changed = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('<Table.') || content.includes('Table.Header')) {
        content = content.replace(/<Table\.Header/g, '<TableHeader');
        content = content.replace(/<\/Table\.Header>/g, '</TableHeader>');
        content = content.replace(/<Table\.Column/g, '<TableColumn');
        content = content.replace(/<\/Table\.Column>/g, '</TableColumn>');
        content = content.replace(/<Table\.Body/g, '<TableBody');
        content = content.replace(/<\/Table\.Body>/g, '</TableBody>');
        content = content.replace(/<Table\.Row/g, '<TableRow');
        content = content.replace(/<\/Table\.Row>/g, '</TableRow>');
        content = content.replace(/<Table\.Cell/g, '<TableCell');
        content = content.replace(/<\/Table\.Cell>/g, '</TableCell>');
        
        if (content.includes('@heroui/react')) {
            const importRegex = /import\s+{([^}]+)}\s+from\s+["']@heroui\/react["']/;
            const match = content.match(importRegex);
            if (match) {
                let imports = match[1].split(',').map(s => s.trim()).filter(Boolean);
                const additions = ['TableHeader', 'TableColumn', 'TableBody', 'TableRow', 'TableCell'];
                for (const add of additions) {
                    if (!imports.includes(add)) imports.push(add);
                }
                const newImport = `import { ${imports.join(', ')} } from "@heroui/react"`;
                content = content.replace(match[0], newImport);
            }
        }
        
        fs.writeFileSync(file, content);
        changed++;
        console.log('Fixed', file);
    }
}
console.log('Total fixed files:', changed);
