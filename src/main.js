import './styles/base.css';
import './styles/profile.css';
import { initializeProfile } from './services/profile-api.js';
import { manageDialogs } from './ui/dialogs.js';

await initializeProfile();
manageDialogs();
await import('./ui/runtime.js');
