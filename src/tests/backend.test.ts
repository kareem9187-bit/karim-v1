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

    // 4. Test Event Types Query
    process.stdout.write('Testing Event Types query... ');
    const eventTypes = await q.eventTypes.all();
    assert(Array.isArray(eventTypes), 'Event Types should return an array');
    console.log(`✅ PASS (${eventTypes.length} event types found)`);

    // 5. Test Availability Query
    process.stdout.write('Testing Availability query... ');
    const availability = await q.availability.all();
    assert(Array.isArray(availability), 'Availability should return an array');
    console.log(`✅ PASS (${availability.length} availability rules found)`);

    console.log('\n🎉 All backend queries passed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
}

runTests();
