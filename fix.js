const fs = require('fs');
let c = fs.readFileSync('src/app/client-page.tsx', 'utf8');
const errIdx = c.indexOf('<div className="qb-progress-dot" data-step="2"></div>');
if(errIdx > -1) {
  let pre = c.substring(0, errIdx);
  pre = pre.trim() + '\n    );\n  })}\n</div>\n\n</div>\n    </main>\n  );\n}';
  fs.writeFileSync('src/app/client-page.tsx', pre);
  console.log('Fixed end of file');
}
