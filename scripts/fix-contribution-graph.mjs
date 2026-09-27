import {readFile, writeFile} from 'node:fs/promises';

// Illustrative activity requested by the owner. The existing graph and tooltip
// components are unchanged; they require week columns containing weekday 0–6.
export function createIllustrativeGraph(total, lastDate = '2026-09-21', seed = 917203) {
  const dayMs = 86400000;
  const end = new Date(lastDate + 'T00:00:00Z');
  const start = new Date(end.getTime() - 364 * dayMs);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const days = [];
  for (let t = start.getTime(); t <= end.getTime(); t += dayMs) {
    const date = new Date(t);
    const progress = (t - start.getTime()) / (end.getTime() - start.getTime());
    const activity = random();
    const isWeekend = date.getUTCDay() === 0 || date.getUTCDay() === 6;
    const quietChance = isWeekend ? .36 : .22;
    // Deterministic variation, with occasional bursts and a busier recent period.
    const weight = activity < quietChance ? 0 :
      (1 + Math.pow(random(), 1.25) * 12) * (.8 + progress * .65) *
      (random() > .92 ? 1.65 : 1);
    days.push({date:date.toISOString().slice(0,10),weekday:date.getUTCDay(),weight});
  }
  const weightTotal = days.reduce((sum, day) => sum + day.weight, 0);
  for (const day of days) {
    const exact = day.weight / weightTotal * total;
    day.contributionCount = Math.floor(exact);
    day.fraction = exact - day.contributionCount;
  }
  const remainder = total - days.reduce((sum, day) => sum + day.contributionCount, 0);
  const ranked = [...days].sort((a,b) => b.fraction - a.fraction);
  for (let index = 0; index < remainder; index++) ranked[index].contributionCount++;
  const weeks = [];
  for (const {date,weekday,contributionCount} of days) {
    if (weekday === 0) weeks.push({contributionDays:[]});
    weeks.at(-1).contributionDays.push({date,weekday,contributionCount});
  }
  return {success:true,totalContributions:total,weeks,illustrative:true,
    source:'Owner-requested randomized visual example; not actual GitHub activity'};
}

const profilePath = new URL('../dist/data/profile.json',import.meta.url);
const profile = JSON.parse(await readFile(profilePath,'utf8'));
profile.github = createIllustrativeGraph(profile.github.totalContributions);
await writeFile(profilePath,JSON.stringify(profile,null,2)+'\n');

// Keep the original date/count hover and link while identifying the sample data.
const componentPath = new URL('../dist/assets/MainProfile-C-umAwHA.js',import.meta.url);
let component = await readFile(componentPath,'utf8');
const before = 'className:`github-contribution-tooltip__hint`,children:`open on GitHub`';
const after = 'className:`github-contribution-tooltip__hint`,children:`Illustrative activity · open on GitHub`';
if (!component.includes(before) && !component.includes(after)) throw new Error('Tooltip anchor missing');
component = component.replace(before,after);
await writeFile(componentPath,component);
console.log(`Graph repaired: ${profile.github.weeks.length} week columns, original style and hover preserved.`);
