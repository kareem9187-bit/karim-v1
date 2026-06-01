const fs = require('fs');
const pagePath = 'd:/karim/karim-portfolio/src/app/page.tsx';
const clientPagePath = 'd:/karim/karim-portfolio/src/app/client-page.tsx';

let content = fs.readFileSync(pagePath, 'utf8');

// Write client-page.tsx
let clientContent = content;
clientContent = clientContent.replace("import { db } from '@/db/index';\nimport { hero } from '@/db/schema';\n", '');
clientContent = '"use client";\n\n' + clientContent;
clientContent = clientContent.replace(
  'export default async function PublicPage() {\n  const [heroData] = await db.select().from(hero).limit(1);',
  'export default function ClientPage({ heroData }: { heroData: any }) {'
);

fs.writeFileSync(clientPagePath, clientContent);

// Write page.tsx
const serverContent = `import { db } from '@/db/index';
import { hero } from '@/db/schema';
import ClientPage from './client-page';

export default async function PublicPage() {
  const [heroData] = await db.select().from(hero).limit(1);
  
  return <ClientPage heroData={heroData} />;
}
`;

fs.writeFileSync(pagePath, serverContent);
console.log('Separated components');
