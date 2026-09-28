import {readFile, readdir, access} from 'node:fs/promises';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

async function files(directory) {
  const entries = await readdir(directory, {withFileTypes: true});
  const nested = await Promise.all(entries.map(entry => entry.isDirectory() ? files(resolve(directory, entry.name)) : resolve(directory, entry.name)));
  return nested.flat();
}

const root = resolve('dist');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)="(\/[^"?]+)(?:\?[^"\s]*)?"/g)) await access(resolve(root, '.' + match[1]));
for (const file of [...await files(root), ...await files(resolve('api')), ...await files(resolve('lib'))].filter(file => file.endsWith('.js'))) {
  const result = spawnSync(process.execPath, ['--check', file], {encoding: 'utf8'});
  if (result.status !== 0) throw new Error(result.stderr);
}
async function checkAssets(value) {
  if (typeof value === 'string' && value.startsWith('/assets/')) await access(resolve(root, '.' + value));
  else if (Array.isArray(value)) await Promise.all(value.map(checkAssets));
  else if (value && typeof value === 'object') await Promise.all(Object.values(value).map(checkAssets));
}
await checkAssets(JSON.parse(await readFile(resolve(root, 'data/profile.json'), 'utf8')));
console.log('Built HTML, JavaScript, APIs, profile data and local assets validated.');
