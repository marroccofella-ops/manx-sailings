// Pure offline query API. No booking or remote network action is performed.
function queryTimetable(rows,metadata,{from,to,date,mode='day'}){
 const actions=metadata.actions,base={dataset_version:metadata.dataset_version,last_source_review:metadata.last_source_review,actions,live_status:false};
 const valid=/^\d{4}-\d{2}-\d{2}$/.test(date||'')&&!Number.isNaN(Date.parse(date+'T12:00:00Z'))&&new Date(date+'T12:00:00Z').toISOString().slice(0,10)===date;
 if(!valid||!['day','next'].includes(mode))return {...base,status:'invalid_query',results:[],explanation:'Supply a valid YYYY-MM-DD departure date and mode day or next.'};
 const island='Isle of Man',port=(from===island)===(to===island)?null:from===island?to:from;
 if(!port)return {...base,status:'invalid_query',results:[],explanation:'Exactly one end of the route must be Isle of Man.'};
 const coverage=metadata.coverage.find(c=>c.port===port);
 if(!coverage||date<coverage.start||date>coverage.end)return {...base,status:'missing_coverage',results:[],explanation:'No imported coverage for this route/date. This does not mean no service.'};
 const matches=rows.filter(r=>r.from===from&&r.to===to&&(mode==='next'?r.date>=date:r.date===date)).sort((a,b)=>(a.date+a.departure).localeCompare(b.date+b.departure));
 const results=mode==='next'?matches.slice(0,1):matches;
 return {...base,status:results.length?'published_results':mode==='next'?'no_later_record_in_snapshot':'no_record_in_source',results,source_conflicts:metadata.withheld_rows.filter(r=>r.from===from&&r.to===to&&(date===r.printed_date||date==='2026-11-16')),explanation:results.length?'Published timetable only; verify operation and availability.':'No matching imported record; not a cancellation or sold-out determination.'};
}
module.exports={queryTimetable};
if(require.main===module){const fs=require('node:fs'),path=require('node:path');try{let input=JSON.parse(process.argv[2]||'{}');if(input.question){if(!/^\d{4}-\d{2}-\d{2}$/.test(input.reference_date||''))throw Error('Plain-English queries require reference_date.');const {parseTimetableQuestion}=require('./assistant.js');const intent=parseTimetableQuestion(input.question,input.reference_date,input.current_route);if(intent.error)throw Error(intent.error);const [port,dir]=intent.route.split('|');input={from:dir==='in'?port:'Isle of Man',to:dir==='in'?'Isle of Man':port,date:intent.date,mode:intent.next?'next':'day'};}console.log(JSON.stringify(queryTimetable(JSON.parse(fs.readFileSync(path.join(__dirname,'data/timetable.json'))),JSON.parse(fs.readFileSync(path.join(__dirname,'data/metadata.json'))),input),null,2));}catch(e){console.error(JSON.stringify({status:'invalid_query',error:e.message}));process.exitCode=1}}
