import './styles/base.css';
import './styles/profile.css';
import { initializeProfile } from './services/profile-api.js';
import { manageDialogs } from './ui/dialogs.js';
import { installPageWheelSmoothing } from './ui/smooth-scroll.js';
import { inject } from '@vercel/analytics';

await initializeProfile();
manageDialogs();
installPageWheelSmoothing();
inject();
await import('./ui/runtime.js');
