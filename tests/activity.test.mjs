import test from 'node:test';
import assert from 'node:assert/strict';
import {historyPayload,presencePayload} from '../lib/activity.js';
import {createActivityHistory} from '../src/services/activity-history.js';
import handler from '../api/game-activity.js';
const now=Date.now();
const fixture={discordUserId:'1239908273885286546',discord:{status:'dnd',connected:true,updatedAt:now/1000,
  desktopStatus:'dnd',webStatus:'offline',mobileStatus:'offline',activities:[
    {kind:'playing',type:0,name:'Minecraft',applicationId:'12345',startMs:now-60000},
    {kind:'spotify',name:'Song',artist:'Artist',startMs:now-20000,endMs:now+180000,trackId:'track'}]},
  recentActivities:[{sessionId:1,kind:'playing',name:'Minecraft',applicationId:'12345',firstSeen:now/1000-60,lastSeen:now/1000}],
  recentSongs:[{sessionId:2,kind:'spotify',name:'Song',artist:'Artist',lastSeen:now/1000}],generatedAt:now/1000};
test('History matches both UI contracts and keeps timestamps',()=>{
 const h=historyPayload(fixture);assert.equal(h.userId,fixture.discordUserId);
 assert.equal(typeof h.activities[0].startedAt,'string');assert.equal(h.recentActivities[0].lastSeenAt,now);
 assert.equal(h.recentSongs[0].trackName,'Song');
});
test('Status, simultaneous game/music, original start, device and disconnection',()=>{
 const p=presencePayload(fixture,{}).data;
 assert.equal(p.discord_status,'dnd');assert.equal(p.activities.length,2);
 assert.equal(p.activities[0].timestamps.start,now-60000);assert.equal(p.spotify.timestamps.end,now+180000);
 assert.equal(p.active_on_discord_desktop,true);assert.equal(p.active_on_discord_mobile,false);
 const stale=presencePayload({...fixture,discord:{...fixture.discord,connected:false}},{}).data;
 assert.equal(stale.discord_status,'unknown');assert.deepEqual(stale.activities,[]);
});
test('History survives failed/empty responses, reload and concurrent polling',async()=>{
 const map=new Map();const storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)};
 let payload=historyPayload(fixture),fail=false,calls=0,published;
 const fetcher=async()=>{calls++;if(fail)throw Error('offline');return new Response(JSON.stringify(payload));};
 const h=createActivityHistory(fetcher,storage,v=>published=v);
 await Promise.all([h.refresh(true),h.refresh(true)]);assert.equal(calls,1);assert.equal(published.recentActivities.length,1);
 fail=true;await h.refresh(true);assert.equal(h.current().recentActivities.length,1);
 const restored=createActivityHistory(fetcher,storage,()=>{});assert.equal(restored.current().recentActivities.length,1);
 fail=false;payload={...payload,recentActivities:[],activities:[]};await restored.refresh(true);
 assert.equal(restored.current().recentActivities.length,1);
});
test('Bot errors are 503, never successful empty history',async()=>{
 const original=global.fetch;global.fetch=async()=>{throw Error('offline')};
 const res={setHeader(){},status(code){this.code=code;return this},json(body){this.body=body;return this}};
 try {await handler({method:'GET'},res);assert.equal(res.code,503);assert.equal(res.body.activities,undefined);}
 finally {global.fetch=original;}
});
