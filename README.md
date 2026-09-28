# wArcxs

Perfil personal con presencia de Discord, actividad de Roblox, estadísticas de stats.fm y reproducción dentro de la página. El código fuente está separado de la salida de producción: `src/` contiene la interfaz, `api/` las funciones y `lib/` la lógica compartida.

## Desarrollo

```sh
npm ci
npm run dev
npm test
npm run build
```

`npm run build` crea `dist/` y comprueba los recursos locales y la sintaxis. `dist/` es generado y no se versiona.

## Integraciones

- stats.fm obtiene pistas, artistas y listening clock reales. Los álbumes se solicitan únicamente al abrir su pestaña y usan `orderBy`.
- La música local (`public/assets/entry-music.mp3`) se inicia tras entrar a la página y comparte el control de volumen. Cuando hay una reproducción remota disponible, se reemplaza y vuelve automáticamente al audio local al terminar.
- Las letras proceden de LRCLIB. Las líneas LRC se resaltan según el segundo de reproducción; si no existen, se muestran las letras simples disponibles.
- La reproducción de una pista usa YouTube dentro de la página cuando `YOUTUBE_API_KEY` está configurada. Si no lo está, las pistas elegidas manualmente se abren en el reproductor embebido de Spotify.
- Roblox consulta el usuario `zahidtql`, su avatar y el juego actual. Sin una cookie válida, el perfil conserva el último juego obtenido por el bot.
- Las actividades de Discord muestran la imagen del juego cuando Discord proporciona un asset o una URL pública.

## Variables de entorno

Parte de `.env.example` y configura las variables en Vercel o en tu entorno de servidor:

| Variable | Uso |
| --- | --- |
| `ACTIVITY_BOT_URL` | URL del bot de presencia e historial. |
| `ACTIVITY_BOT_TOKEN` | Token opcional para ese bot. |
| `YOUTUBE_API_KEY` | Habilita audio sincronizado dentro de la página. |
| `ROBLOX_COOKIE` | Cookie `.ROBLOSECURITY` que permite consultar presencia de Roblox. |

Nunca expongas estas variables en el navegador ni las subas al repositorio.

## Despliegue

Despliega la raíz del repositorio en Vercel. `vercel.json` ejecuta el build, publica `dist/` y mantiene las rutas `api/` sin caché. Los datos de perfil y los recursos locales viven en `public/`; se copian a `dist/` durante el build.
