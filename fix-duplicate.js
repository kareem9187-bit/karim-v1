const fs=require('fs');
const p='d:/karim/karim-portfolio/src/app/client-page.tsx';
let c=fs.readFileSync(p,'utf8');
const m='{/* Progress Rail (vertical line on left) */}';
const i=c.indexOf(m);
if(i!==-1){
  const j=c.indexOf(m,i+m.length);
  if(j!==-1){
    fs.writeFileSync(p,c.slice(0,i)+c.slice(j));
    console.log('Fixed duplicate section in client-page.tsx');
  } else {
    console.log('j not found');
  }
} else {
  console.log('i not found');
}
