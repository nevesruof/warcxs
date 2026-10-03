export function activityGameKey(activity) {
  const id = String(activity.applicationId || activity.application_id || `name:${activity.name}`);
  const experience = String(activity.details || '').trim().toLowerCase();
  return String(activity.name).toLowerCase() === 'roblox' && experience
    ? `${id}:${experience}`
    : id;
}

export function hasGameDetails(game) {
  return !!(game && (game.summary || game.storyline || game.screenshots?.length));
}
