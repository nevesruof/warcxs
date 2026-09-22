import {readFile, readdir, access} from 'node:fs/promises';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
const root = resolve('dist');
const html = await readFile(resolve(root,'index.html'),'utf8');
for (const match of html.matchAll(/(?:src|href)="(\/[^"?]+)(?:\?[^"\s]*)?"/g)) {
  await access(resolve(root,'.'+match[1]));
}
for(const file of ['app.js','statsfm.js',...(await readdir(resolve(root,'assets'))).filter(f=>f.endsWith('.js')).map(f=>'assets/'+f)]) {
  const result=spawnSync(process.execPath,['--check',resolve(root,file)],{encoding:'utf8'});
  if(result.status!==0) throw new Error(result.stderr);
}
const data=JSON.parse(await readFile(resolve(root,'data/profile.json'),'utf8'));
const check=async value=>{
  if(typeof value==='string'&&/^\/assets\//.test(value))await access(resolve(root,'.'+value));
  else if(Array.isArray(value))for(const item of value)await check(item);
  else if(value&&typeof value==='object')for(const item of Object.values(value))await check(item);
};
await check(data);
console.log('HTML, JavaScript, profile data, and local assets validated.');
