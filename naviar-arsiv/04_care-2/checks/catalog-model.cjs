'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const localModule = {exports:{}};
new Function('module', fs.readFileSync('dist/model.js','utf8'))(localModule);
const model = localModule.exports;
const catalog = JSON.parse(fs.readFileSync('catalog.json','utf8'));
assert.equal(catalog.clinicians.length,42);
assert.equal(catalog.languages.length,113);
assert.equal(new Set(catalog.clinicians.map(c=>c.id)).size,42);
assert.equal(new Set(catalog.languages.map(l=>l.code)).size,113);
assert.ok(catalog.clinicians.every(c=>c.example && !c.clinicalLanguageVerified && !c.licenseVerified));
assert.ok(catalog.languages.every(l=>!l.clinicalLanguageVerified && l.availability==='not_offered'));
for(const language of catalog.languages){
 const actual=model.profilesForLanguage(catalog.clinicians,language.code).map(c=>c.id);
 assert.deepEqual(actual,language.profileIds,`Inconsistent catalogue: ${language.code}`);
 assert.deepEqual(model.filterProfiles(catalog,{},'', '', language.code).map(c=>c.id), actual);
}
for(const c of catalog.clinicians) assert.ok(c.languages.every(code=>catalog.languages.some(l=>l.code===code)));
const expected={jv:'Budi Santoso',ceb:'Maria Santos',da:'Sara Lindqvist',ha:'Marcus Adeyemi',ig:'Daniel Okafor',hu:'Andrei Popescu',nah:'Rosa Delgado',no:'Sara Lindqvist',yo:'Marcus Adeyemi',ber:'Fatima Zahra Idrissi',mr:'Ravi Deshmukh',lo:'Siriporn Chaiyaporn'};
assert.equal(catalog.languages.filter(l=>l.legacyDifference).length,12);
for(const [code,name] of Object.entries(expected)){
 assert.ok(model.profilesForLanguage(catalog.clinicians,code).some(c=>c.name===name),code);
 assert.ok(catalog.languages.find(l=>l.code===code).legacyDifference);
}
assert.deepEqual(model.filterProfiles(catalog,{},'does-not-exist'),[]);
assert.deepEqual(model.filterLanguages(catalog.languages,'does-not-exist'),[]);
assert.ok(model.filterProfiles(catalog,{'Internal medicine':'İç hastalıkları'},'iç hastaliklari').length>0);
assert.ok(model.filterLanguages(catalog.languages,'yoruba').some(l=>l.code==='yo'));
assert.ok(model.filterLanguages(catalog.languages,'norsk').some(l=>l.code==='no'));
assert.deepEqual(model.readJourney(''),model.initialJourney());
assert.deepEqual(model.readJourney('#step=3&language=tr&questions=2,0'),{step:3,language:'tr',questions:['2','0']});
assert.deepEqual(model.readJourney('#step=3&language=en&questions='),{step:2,language:'en',questions:[]});
assert.deepEqual(model.readJourney('#step=99&language=unknown&questions=0,0,<script>,2&symptom=anything'),{step:0,language:'nb',questions:['0','2']});
assert.deepEqual(model.groupSlots([]),[]);
const calendarFixture=[
 {id:'late',starts:Date.parse('2026-09-06T22:30:00Z')},
 {id:'earlier',starts:Date.parse('2026-09-06T21:30:00Z')},
 {id:'daytime',starts:Date.parse('2026-09-07T08:00:00Z')}
];
const grouped=model.groupSlots(calendarFixture);
assert.deepEqual(grouped.map(d=>d.day),['2026-09-06','2026-09-07']);
assert.deepEqual(grouped[1].slots.map(s=>s.id),['late','daytime']);
assert.equal(calendarFixture[0].id,'late','Grouping must not mutate the API result');
for(const instant of ['2026-03-29T00:30:00Z','2026-03-29T01:30:00Z','2026-10-25T00:30:00Z','2026-10-25T01:30:00Z']){
 assert.equal(model.groupSlots([{id:instant,starts:Date.parse(instant)}])[0].day,instant.slice(0,10));
}
console.log('PASS: 42 profiles, 113 language joins, all 12 known differences, filters, safe example state and empty-result cases.');
console.log('PASS: Calendar groups use Oslo dates across midnight and both daylight-saving transitions; empty input and ordering verified.');
