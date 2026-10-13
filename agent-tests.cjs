const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {queryTimetable:query}=require('./query.cjs');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const rows=read('data/timetable.json'),meta=read('data/metadata.json'),original=read('sailings.json');
// Validate the exact JSON Schema keywords used by our published schemas.
// This is a bounded project check, not a general JSON Schema implementation.
function check(value,schema){
 if('const'in schema)assert.deepEqual(value,schema.const);
 if(schema.enum)assert.ok(schema.enum.includes(value));
 const type=value===null?'null':Array.isArray(value)?'array':Number.isInteger(value)?'integer':typeof value;
 if(schema.type)assert.ok([].concat(schema.type).includes(type),'Unexpected type '+type);
 if(schema.pattern)assert.match(value,new RegExp(schema.pattern));
 if(type==='array'){if(schema.minItems)assert.ok(value.length>=schema.minItems);if(schema.items)value.forEach(x=>check(x,schema.items))}
 if(type==='object'){for(const k of schema.required||[])assert.ok(Object.hasOwn(value,k),'Missing '+k);for(const [k,v]of Object.entries(value)){if(schema.additionalProperties===false)assert.ok(Object.hasOwn(schema.properties,k),'Extra '+k);if(schema.properties?.[k])check(v,schema.properties[k])}}
}
const schema=read('data/timetable.schema.json');check(rows,schema);check(meta,read('data/metadata.schema.json'));
assert.throws(()=>check([{...rows[0],departure:'25:99'}],schema));
assert.throws(()=>check([{...rows[0],status:'operating'}],schema));
assert.equal(rows.length,402);assert.equal(new Set(rows.map(r=>r.id)).size,402);
for(const r of rows){assert.ok(original.some(s=>s.date===r.date&&s.depart===r.departure&&s.arrive===r.arrival&&s.port===(r.from==='Isle of Man'?r.to:r.from)&&s.direction===(r.from==='Isle of Man'?'out':'in')));assert.ok(meta.sources.some(s=>s.id===r.source_id&&s.url===r.source));assert.deepEqual(r.actions,meta.actions);assert.equal(r.extraction_date,null)}
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');assert.equal(hash('data/timetable.json'),meta.hashes.timetable_sha256);assert.equal(hash('data/timetable.csv'),meta.hashes.csv_sha256);
for(const f of ['timetable.json','timetable.csv','metadata.json'])assert.ok(fs.readFileSync('data/'+f).equals(fs.readFileSync('data/snapshots/'+meta.dataset_version+'/'+f)));
function parseCSV(text){let records=[],record=[],field='',quoted=false;for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++}else quoted=!quoted}else if(c===','&&!quoted){record.push(field);field=''}else if(c==='\n'&&!quoted){record.push(field);records.push(record);record=[];field=''}else field+=c}return records}
const [head,...csv]=parseCSV(fs.readFileSync('data/timetable.csv','utf8'));assert.equal(csv.length,402);for(let i=0;i<csv.length;i++){const r=Object.fromEntries(head.map((k,n)=>[k,csv[i][n]]));assert.equal(r.id,rows[i].id);assert.equal(r.from,rows[i].from);assert.equal(r.to,rows[i].to);assert.equal(r.source,rows[i].source);assert.deepEqual(JSON.parse(r.notes),rows[i].notes);for(const k of Object.keys(meta.actions))assert.equal(r[k],rows[i].actions[k])}
const input={from:'Liverpool',to:'Isle of Man',date:'2026-10-07'};
assert.equal(query(rows,meta,input).status,'no_record_in_source');
assert.equal(query(rows,meta,{...input,mode:'next'}).results[0].date,'2026-10-08');
assert.equal(query(rows,meta,{...input,date:'2026-12-01'}).status,'missing_coverage');
assert.equal(query(rows,meta,{...input,from:'Dublin'}).status,'missing_coverage');
assert.equal(query(rows,meta,{...input,date:'2026-02-30'}).status,'invalid_query');
assert.equal(query(rows,meta,{...input,from:'Isle of Man'}).status,'invalid_query');
assert.equal(query(rows,meta,{from:'Larne',to:'Isle of Man',date:'2026-11-16'}).source_conflicts.length,1);
assert.equal(query(rows,meta,{...input,date:'2026-11-30',mode:'next'}).status,'no_later_record_in_snapshot');
assert.ok(rows.some(r=>r.arrival_date>r.date));
const html=fs.readFileSync('index.html','utf8');assert.equal((html.match(/<tr><td>2026-/g)||[]).length,402);
const datasets=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(m=>JSON.parse(m[1]));assert.ok(datasets.some(d=>d['@type']==='Dataset'&&d.distribution.length===2));
console.log('Passed agent schemas, 402-row correspondence, CSV equivalence, source/action provenance, hashes, immutable snapshots, query boundaries and static HTML/JSON-LD.');

assert.ok(require('./assistant.js').parseTimetableQuestion('Liverpool 2027-01-01','2026-10-14').error);
