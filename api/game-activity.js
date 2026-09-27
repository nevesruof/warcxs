import {readBot, historyPayload} from '../lib/activity.js';
export default async function handler(req,res) {
  res.setHeader('Cache-Control','no-store');
  if(req.method && req.method!=='GET')return res.status(405).json({error:'GET only'});
  try {return res.status(200).json(historyPayload(await readBot()));}
  catch {return res.status(503).json({error:'Activity history temporarily unavailable'});}
}
