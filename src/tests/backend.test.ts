import assert from 'node:assert';
import { q } from '../lib/queries';

async function runTests() {
  console.log('🚀 Starting Backend Tests...');

  try {
    // 1. Test Site Settings
    process.stdout.write('Testing Site Settings query... ');
    const settings = await q.siteSettings();
    assert(settings !== undefined, 'Settings should not be undefined');
    console.log('✅ PASS');

    // 2. Test Hero Query
    process.stdout.write('Testing Hero query... ');
    const hero = await q.hero();
    assert(hero !== undefined, 'Hero should not be undefined');
    console.log('✅ PASS');

    // 3. Test Works Query
    process.stdout.write('Testing Works query... ');
    const works = await q.works.all();
    assert(Array.isArray(works), 'Works should return an array');
    console.log(`✅ PASS (${works.length} works found)`);

    console.log('\n🎉 All backend queries passed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
}

runTests();
