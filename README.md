# iTake — cheatinformer

A personal site with the supplied reference layout, customized profile imagery, and public listening history.

## Run

```sh
npm ci
npm run dev
```

The publishable website is in `dist/`; it can also be served by any static web server. `npm run build` verifies the authored static output, JavaScript syntax, and local assets.

## Content

- `dist/data/profile.json`: editable profile, connections, activity, tracks, statistics and asset paths.
- `dist/app.js`: local data adapter and dialog keyboard support.
- `dist/adaptation.css`: accessibility and fallback adjustments.
- `dist/assets/`: public reference client styles/components and local image assets. React, motion and renderer code are bundled in the reference client.

The reference's layout, breakpoints, entry animation, animated name, mouse effects, floating dock, music carousel and modal layouts are retained. Profile imagery, game imagery, album art and the GitHub contribution snapshot are bundled locally.

## Integration boundaries

The private original APIs and profile socket are not contacted. View count and recent activity retain the reference snapshot. Music comes from the public wArcxs stats.fm profile, with the latest 20 listens and public rankings. Recent listening refreshes from the network every five minutes while the page is visible (and when the tab is shown again, at most every 30 seconds), retaining the saved history and its original timestamps if the service is unavailable. Statistics that are not shared by stats.fm remain unavailable.

The Roblox card shows an interactive 3D model when `avatar3d` in `dist/data/profile.json` lists the model files (`obj`, `mtl` and `textures` are Roblox CDN hashes, plus `targetId`). `dist/app.js` downloads them once in the browser from `*.rbxcdn.com`, so that CDN must allow cross-origin requests; if it does not, or the files are gone, the card shows the flat image from `robloxProfile.avatarUrl` instead. To refresh the model after an avatar change, open `https://thumbnails.roblox.com/v1/users/avatar-3d?userId=<id>`, then open its `imageUrl`, and copy the new `obj`, `mtl` and `textures` values into `avatar3d`. The original Roblox 3D endpoint itself requires authorization, so it is not contacted.

The five social links point to the owner's Discord, Telegram, Spotify, GitHub and email. The profile uses the supplied avatar and katana banner, the animated Spirit Embers decoration, and the retained imnotreadingal.lat connection. Listening cards open the corresponding Spotify track. The entry audio is the supplied Копы.mp3, hosted locally as `dist/assets/entry-music.mp3`. This project does not collect credentials or send messages.

The original client assets were retrieved from the public site for this requested recreation. The supplied recording was used for reference and is not included in the hosted output.

## Badges and server tag

- Profile badges live in `snapshot.profile.badges` in `dist/data/profile.json`. Each entry has an `icon` (`/assets/...`) and a `description`, which is the text shown when the badge is hovered or tapped. Removing an entry removes its icon and its text.
- Active badges use `discord-nitro-bronze.png`, `discord-server-booster.svg` and `discord-quest.png`.
- The server tag text is `tag` (currently `FM`) in `profile.json`; the skull icon is `dist/assets/clan-skull.svg`. The compact pill styling is in `dist/adaptation.css`; the tag markup is in `dist/assets/MainProfile-*.js`.

## Source structure and deployment

This is a static site. The React interface and styles are included as bundled JavaScript and CSS in `dist/assets/`; the original unbundled JSX/TSX files are not part of this project. Profile data and the data adapters remain editable in `dist/data/profile.json`, `dist/app.js` and `dist/statsfm.js`.

Use `npm ci` and `npm run dev` for local development. Run `npm run build` to validate the files. Deploy the contents of `dist/` to a static host and configure unknown page routes to serve `index.html`. Audio begins after the visitor enters the site, subject to browser autoplay settings.
