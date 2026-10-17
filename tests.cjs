const assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');const {parseTimetableQuestion:parse}=require('./assistant.js');const rows=JSON.parse(fs.readFileSync('sailings.json','utf8'));
assert.equal(rows.length,402);assert.equal(rows.filter(s=>s.port==='Larne').length,71);assert.equal(rows.filter(s=>s.port==='Liverpool'&&s.direction==='in').length,43);
assert.equal(rows.filter(s=>s.port==='Liverpool'&&s.date==='2026-10-07').length,0);
assert.equal(rows.filter(s=>s.port==='Larne'&&s.direction==='in'&&s.date==='2026-11-16').length,0);
assert.equal(new Set(rows.map(s=>[s.date,s.port,s.direction,s.depart].join('|'))).size,402);
assert.deepEqual(parse('from Liverpool to Isle of Man tomorrow','2026-10-07'),{route:'Liverpool|in',date:'2026-10-08',next:false});
assert.deepEqual(parse('next ferry to Larne 2026-11-05','2026-10-07'),{route:'Larne|out',date:'2026-11-05',next:true});
assert.ok(parse('Liverpool 31/11/2026','2026-10-07').error);assert.ok(parse('next ferry','2026-10-07').error);
for(const f of ['planner.js','assistant.js'])new vm.Script(fs.readFileSync(f,'utf8'));
const h=fs.readFileSync('Manx-Sailings-Standalone.html','utf8');assert.ok(!/fetch\(|<script src=|<link rel="stylesheet"|@import/.test(h));
console.log('Passed: data integrity, Liverpool gaps, Ireland conflict, local intent parsing, script syntax and offline packaging.');

const validate=require('./validate-timetable.cjs');assert.equal(validate(rows),402);assert.throws(()=>validate([...rows,rows[0]]));assert.throws(()=>validate([{...rows[0],date:'2026-02-30'}]));assert.throws(()=>validate([{...rows[0],depart:'25:00'}]));

const page=fs.readFileSync('index.html','utf8');const ids=[...page.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);for(const m of page.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(m[1]),'Missing anchor '+m[1]);for(const id of ['comfort','ports-guide','special-needs','disruption','history-guide','methodology'])assert.ok(ids.includes(id));assert.ok(page.includes('https://commerce.steam-packet.com/'));assert.ok(h.includes('https://www.nhs.uk/conditions/motion-sickness/'));assert.ok(h.includes('no live prices, availability or real-time status'));console.log('Passed passenger guide structure, anchor integrity, official hand-off and offline resources.');
const context={document:{getElementById:()=>({})},window:{},Date};vm.createContext(context);vm.runInContext(fs.readFileSync('planner.js','utf8').split("fetch('sailings.json')")[0],context);assert.equal(vm.runInContext("checkInTime('00:15',45).time",context),'23:30');assert.equal(vm.runInContext("checkInTime('00:15',45).previous",context),true);assert.equal(vm.runInContext("checkInTime('19:15',25).time",context),'18:50');const csv=fs.readFileSync('sailings.csv','utf8').trim().split('\n');assert.equal(csv.length,403);assert.equal(csv[0],'date,port,direction,depart,arrive,vessel');for(let i=0;i<rows.length;i++)assert.equal(csv[i+1],['date','port','direction','depart','arrive','vessel'].map(k=>rows[i][k]).join(','));assert.ok(h.includes('href="data:text/csv;base64,'));assert.ok(h.includes('href="data:application/json;base64,'));console.log('Passed check-in midnight arithmetic, matching CSV rows and embedded offline downloads.');

for(const m of h.matchAll(/<script(?: [^>]*)?>([\s\S]*?)<\/script>/g)){if(!m[0].includes('application/ld+json'))new vm.Script(m[1]);}console.log('Standalone embedded research scripts parse.');
