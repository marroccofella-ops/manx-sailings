(function(root){
 'use strict';
 const dayMs=86400000,stamp=d=>Date.parse(d+'T12:00:00Z');
 function analyze(rows,coverage,{port='Liverpool',direction='in',start,end,removeVessel='none'}={}){
  const c=coverage.find(x=>x.port===port);if(!c)return {error:'No imported coverage'};
  start=start||c.start;end=end||c.end;const valid=d=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&Number.isFinite(stamp(d))&&new Date(stamp(d)).toISOString().slice(0,10)===d;
  if(!valid(start)||!valid(end)||start<c.start||end>c.end||start>end||!['in','out'].includes(direction)||!['none','M','BC'].includes(removeVessel))return {error:'Select a valid interval and experiment configuration within imported coverage.'};
  const selected=rows.filter(r=>r.port===port&&r.direction===direction&&r.date>=start&&r.date<=end);
  const retained=selected.filter(r=>removeVessel==='none'||r.vessel!==removeVessel);
  const weekday=Array.from({length:7},(_,i)=>({day:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][i],observed_days:0,departures:0,days_with_departures:0}));
  const counts=new Map();retained.forEach(r=>counts.set(r.date,(counts.get(r.date)||0)+1));
  let days=0,serviceDays=0,longest=0,run=0;const daily=[];
  for(let t=stamp(start);t<=stamp(end);t+=dayMs){const date=new Date(t).toISOString().slice(0,10),w=weekday[new Date(t).getUTCDay()],n=counts.get(date)||0;w.observed_days++;w.departures+=n;if(n){serviceDays++;w.days_with_departures++;run=0}else{run++;longest=Math.max(longest,run)}days++;daily.push({date,departures:n})}
  return {port,direction,start,end,removeVessel,observed_days:days,baseline_departures:selected.length,departures:retained.length,removed_departures:selected.length-retained.length,days_with_departures:serviceDays,days_without_records:days-serviceDays,longest_zero_record_run:longest,weekday,daily,interpretation:'Published-record coverage, not reliability, cancellations, capacity or a prediction. Scenario removes all records for a vessel without substitutions.'};
 }
 // Small multinomial Naive Bayes experiment. Synthetic labels, no passenger data.
 const train=[['in','from PORT to isle of man'],['in','depart PORT arrive douglas'],['in','PORT towards the island'],['in','leaving PORT for douglas'],['out','from isle of man to PORT'],['out','depart douglas arrive PORT'],['out','island towards PORT'],['out','leaving douglas for PORT']];
 const ports=['Liverpool','Heysham','Larne'];
 const tokenize=text=>(text.toLowerCase().replace(/liverpool|heysham|larne/g,'port').match(/[a-z]+/g)||[]).reduce((a,w,i,ws)=>a.concat(w,i?ws[i-1]+'_'+w:[]),[]);
 function trainModel(){const docs=train.flatMap(([label,text])=>ports.map(p=>({label,text:text.replace('PORT',p)})));const vocab=new Set(),counts={in:{},out:{}},totals={in:0,out:0};docs.forEach(d=>tokenize(d.text).forEach(w=>{vocab.add(w);counts[d.label][w]=(counts[d.label][w]||0)+1;totals[d.label]++}));return {docs,counts,totals,vocab}}
 const model=trainModel();
 function classify(text){const tokens=tokenize(text);if(!tokens.length||!tokens.includes('port')||!tokens.some(t=>['douglas','island','isle','man'].includes(t)))return {label:null,reason:'Unsupported or underspecified route'};const scores=['in','out'].map(label=>({label,score:Math.log(.5)+tokens.filter(t=>model.vocab.has(t)).reduce((sum,t)=>sum+Math.log(((model.counts[label][t]||0)+1)/(model.totals[label]+model.vocab.size)),0)})).sort((a,b)=>b.score-a.score);const margin=scores[0].score-scores[1].score;return {label:margin<0.1?null:scores[0].label,log_score_margin:margin,reason:'Synthetic-trained direction classifier; no operational use'};}
 function evaluate(){const templates=[['in','please travel from PORT to douglas'],['in','ferry leaving PORT for the isle of man'],['out','please travel from douglas to PORT'],['out','ferry leaving the isle of man for PORT']];const cases=templates.flatMap(([expected,text])=>ports.map(p=>({text:text.replace('PORT',p),expected})));const results=cases.map(c=>({...c,predicted:classify(c.text).label}));const matrix={in:{in:0,out:0,abstain:0},out:{in:0,out:0,abstain:0}};results.forEach(r=>matrix[r.expected][r.predicted||'abstain']++);return {model:'Multinomial Naive Bayes, unigram + bigram, Laplace alpha=1',training_documents:model.docs.length,test_documents:results.length,correct:results.filter(r=>r.expected===r.predicted).length,abstentions:results.filter(r=>r.predicted===null).length,confusion_matrix:matrix,cases:results,limitations:'Synthetic template-disjoint test only; ports normalised to PORT. Small related phrase set is not real-world validation; score margins are not calibrated probabilities.'}}
 const api={analyze,classify,evaluate};if(typeof module!=='undefined')module.exports=api;else root.ManxResearch=api;
})(typeof globalThis!=='undefined'?globalThis:this);
