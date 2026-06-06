const fs = require('fs');

let c = fs.readFileSync('src/app/client-page.tsx', 'utf8');
c = c.replace("import { SpaNavbar } from '@/components/public/SpaNavbar';", "import SpaNavbar from '@/components/public/SpaNavbar';");
fs.writeFileSync('src/app/client-page.tsx', c);
console.log('Fixed SpaNavbar import');

let a = fs.readFileSync('src/app/admin/availability/AvailabilityForm.tsx', 'utf8');
a = a.replace("saveOverride,", "");
a = a.replace("import { saveAvailability, saveOverride }", "import { saveAvailability }");
fs.writeFileSync('src/app/admin/availability/AvailabilityForm.tsx', a);

let t = fs.readFileSync('src/app/admin/training/page.tsx', 'utf8');
t = t.replace("Divider,", "");
t = t.replace("import { Card, CardBody, CardHeader, Divider }", "import { Card, CardBody, CardHeader }");
t = t.replace("<Divider />", "<hr />");
fs.writeFileSync('src/app/admin/training/page.tsx', t);

let ts = fs.readFileSync('src/app/api/bookings/bookings/test-services/route.ts', 'utf8');
ts = ts.replace("import { testGoogleCalendar } from '@/utils/google';", "// import { testGoogleCalendar } from '@/utils/google';");
fs.writeFileSync('src/app/api/bookings/bookings/test-services/route.ts', ts);

console.log('Fixed imports');
