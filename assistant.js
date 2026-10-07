// A transparent, offline intent parser. No model, API, tracking or remote calls.
function parseTimetableQuestion(text, referenceDate, currentRoute='Liverpool|in') {
 const q=text.trim().toLowerCase();const port=['Liverpool','Heysham','Larne','Dublin'].find(p=>q.includes(p.toLowerCase()));
 if(!port)return {error:'Include a port: Liverpool, Heysham, Larne or Dublin.'};
 let direction=currentRoute.split('|')[1];
 if(/from (the )?(isle of man|douglas|island)|to (liverpool|heysham|larne|dublin)/.test(q))direction='out';
 else if(/from (liverpool|heysham|larne|dublin)|to (the )?(isle of man|douglas|island)/.test(q))direction='in';
 let date=referenceDate;let match=q.match(/\b(2026)-(\d{2})-(\d{2})\b/);
 if(match)date=match[0];else if((match=q.match(/\b(\d{1,2})\/(\d{1,2})\/(2026)\b/)))date=`${match[3]}-${match[2].padStart(2,'0')}-${match[1].padStart(2,'0')}`;
 else if(q.includes('tomorrow')){let d=new Date(referenceDate+'T12:00:00');d.setDate(d.getDate()+1);date=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
 if(Number.isNaN(Date.parse(date+'T12:00:00'))||new Date(date+'T12:00:00').getDate()!==Number(date.slice(-2)))return {error:'Use a valid date, such as 2026-11-07.'};
 const min=port==='Larne'?'2026-09-02':'2026-09-21';if(date<min||date>'2026-11-30')return {error:'That date is outside the imported autumn timetable.'};
 return {route:port+'|'+direction,date,next:/\bnext\b/.test(q)};
}
if(typeof module!=='undefined')module.exports={parseTimetableQuestion};
if(typeof document!=='undefined')document.getElementById('askForm').onsubmit=e=>{
 e.preventDefault();const answer=parseTimetableQuestion(document.getElementById('question').value,document.getElementById('date').value,document.getElementById('route').value);
 const message=document.getElementById('askAnswer');if(answer.error){message.textContent=answer.error;return;}
 document.getElementById('route').value=answer.route;document.getElementById('date').value=answer.date;
 if(answer.next){const found=routeRows().find(s=>s.date>=answer.date);if(found)document.getElementById('date').value=found.date;}
 render();message.textContent='Planner updated using the published timetable. No live availability is inferred.';
};
