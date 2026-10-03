import { endpoint } from "../lib/http.js";
import { readDiscordProfile } from "../lib/discord-profile.js";

export default endpoint(readDiscordProfile);
