import {test} from 'node:test';
import assert from 'node:assert/strict';
import '../dist/studio-demo/sample-calendar.js';

test('sample calendar follows Oslo midnight, year rollover and daylight-saving dates',()=>{
  const examples=[
    ['2026-09-05T22:30:00Z',['2026-09-07','2026-09-08','2026-09-09']],
    ['2026-12-31T23:30:00Z',['2027-01-02','2027-01-03','2027-01-04']],
    ['2026-03-28T12:00:00Z',['2026-03-29','2026-03-30','2026-03-31']],
    ['2026-10-24T12:00:00Z',['2026-10-25','2026-10-26','2026-10-27']],
  ];
  for(const [now,expected] of examples){
    const days=SampleCalendar.sampleDays(new Date(now));
    assert.deepEqual(days.map(d=>new Date(d).toISOString().slice(0,10)),expected);
    for(const locale of ['nb','en','tr'])assert.ok(SampleCalendar.label(days[0],locale,true).includes(expected[0].slice(0,4)));
  }
});
