const fs = require('fs');
const file = 'd:/karim/karim-portfolio/src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add import for welcomeChapters if missing
if (!content.includes('welcomeChapters')) {
  content = content.replace(
    '} from \'@/db/schema\';',
    '  welcomeChapters,\n} from \'@/db/schema\';'
  );
}

// 2. Fetch welcomeChaptersData
if (!content.includes('welcomeChaptersData =')) {
  content = content.replace(
    'const [heroData] = await db.select().from(hero).limit(1);',
    'const [heroData] = await db.select().from(hero).limit(1);\n  const welcomeChaptersData = await db.select().from(welcomeChapters).orderBy(asc(welcomeChapters.order));'
  );
}

// 3. Pass to ClientPage
if (!content.includes('welcomeChaptersData={welcomeChaptersData}')) {
  content = content.replace(
    'heroData={heroData}',
    'heroData={heroData}\n        welcomeChaptersData={welcomeChaptersData}'
  );
}

fs.writeFileSync(file, content);
console.log('Updated page.tsx');
