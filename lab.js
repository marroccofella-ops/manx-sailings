(function(){
 const $=id=>document.getElementById(id);
 function init(rows,coverage){
  function render(){const port=$('labPort').value,c=coverage.find(x=>x.port===port);$('labStart').min=$('labEnd').min=c.start;$('labStart').max=$('labEnd').max=c.end;if(!$('labStart').value||$('labStart').value<c.start)$('labStart').value=c.start;if(!$('labEnd').value||$('labEnd').value>c.end)$('labEnd').value=c.end;
   const result=ManxResearch.analyze(rows,coverage,{port,direction:$('labDirection').value,start:$('labStart').value,end:$('labEnd').value,removeVessel:$('labVessel').value});
   $('labDownload').disabled=Boolean(result.error);if(result.error){$('labResults').textContent=result.error;return}
   $('labResults').innerHTML=`<div class="lab-metrics"><p><strong>${result.departures}</strong>published departures</p><p><strong>${result.days_with_departures} / ${result.observed_days}</strong>days with records</p><p><strong>${result.longest_zero_record_run}</strong>longest zero-record run (days)</p><p><strong>${result.removed_departures}</strong>records removed by scenario</p></div><div class="table-scroll"><table><caption>Weekday profile: denominator is days of that weekday in the selected interval</caption><thead><tr><th>Day</th><th>Observed days</th><th>Departures</th><th>Days with records</th><th>Departures / observed day</th></tr></thead><tbody>${result.weekday.map(w=>`<tr><th scope="row">${w.day}</th><td>${w.observed_days}</td><td>${w.departures}</td><td>${w.days_with_departures}</td><td>${w.observed_days?(w.departures/w.observed_days).toFixed(2):'N/A'}</td></tr>`).join('')}</tbody></table></div><p class="help">${result.interpretation}</p>`;
   $('labDownload').onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify({dataset_version:'2026-10-14-v1',last_source_review:'2026-10-07',...result},null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='manx-schedule-experiment.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
  }
  for(const id of ['labPort','labDirection','labStart','labEnd','labVessel'])$(id).onchange=render;render();
  const e=ManxResearch.evaluate();$('mlEvaluation').textContent=`Reproducible synthetic test: ${e.correct}/${e.test_documents} correct; ${e.abstentions} abstentions. ${e.training_documents} training phrases. This is not a real-world accuracy estimate.`;
  $('mlForm').onsubmit=ev=>{ev.preventDefault();const r=ManxResearch.classify($('mlText').value);$('mlAnswer').textContent=r.label?(r.label==='in'?'Predicted direction: to Isle of Man.':'Predicted direction: from Isle of Man.')+' Experimental result only; not passed to the sailing planner.':'Model abstained: route is unsupported, ambiguous or underspecified.';};
 }
 window.initResearchLab=init;
 if(!window.MANX_OFFLINE_LAB)fetch('sailings.json').then(r=>{if(!r.ok)throw Error();return r.json()}).then(rows=>init(rows,[{port:'Liverpool',start:'2026-09-21',end:'2026-11-30'},{port:'Heysham',start:'2026-09-21',end:'2026-11-30'},{port:'Larne',start:'2026-09-02',end:'2026-11-30'}])).catch(()=>{$('labResults').textContent='Research data unavailable. Use the source repository to reproduce the analysis.'});
})();
