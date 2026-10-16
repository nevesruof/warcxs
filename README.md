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

## Caché y límites

Las rutas en vivo (`/api/presence`, `/api/game-activity`) se cachean en el CDN 5 s con `stale-while-revalidate` (`LIVE_CACHE` en `lib/http.js`), y `/api/roblox` y `/api/profile` unos segundos más: muchos visitantes comparten una sola consulta al bot. Los errores nunca se cachean. `/api/playback`, `/api/lyrics` y `/api/roblox?universeId=` limitan las búsquedas distintas por cliente (30/min, en memoria por instancia); para un tope global usa el rate limiting de Vercel. Con la cuota por defecto de YouTube (10 000 unidades/día) caben unas 100 búsquedas al día.

`vercel.json` añade cabeceras de seguridad y una CSP en modo `Report-Only`: abre el sitio con la consola abierta, revisa que no aparezcan avisos y entonces renombra la cabecera a `Content-Security-Policy`.

## Tarjeta de proyectos

La tarjeta con barra de progreso (proyectos, comunidades de Discord y el aviso) se edita en `src/config/projects.js`: cada slide es un objeto con `eyebrow`, `title`, `blurb`, `logo` o `monogram` y un `link` opcional (solo `https`). Para agregar una comunidad, añade otro objeto; la duración por slide es `SLIDE_DURATION_MS`. Se puede deslizar con mouse/dedo, con las flechas del teclado o tocando la barra, y se pausa al pasar el cursor o enfocarla.

## Integraciones

- Discord sigue al usuario `893966003690668102`. Las cachés de perfil y actividad se separan por usuario. El código del bot está en [`bot/`](bot/README.md); actualiza esos archivos en el hosting y reinicia el bot para que también cambie el emisor de la presencia.

- stats.fm obtiene pistas, artistas y listening clock reales. Los álbumes se solicitan únicamente al abrir su pestaña y usan `orderBy`.
- Al entrar se reproduce únicamente la pista activa de Spotify, cuando está disponible. Si no hay una pista activa, la página permanece en silencio.
- El audio en vivo sigue los tiempos de Discord sin depender de los renders de la interfaz. Los fallos temporales de YouTube se reintentan con esperas progresivas; cambiar o terminar la canción cancela el intento anterior. Al detener una pista manual se retoma la canción actualmente activa.
- Las letras proceden de LRCLIB. Las líneas LRC se resaltan según el segundo de reproducción; si no existen, se muestran las letras simples disponibles.
- El estado de ánimo manual se edita en `public/data/mood.json` (`enabled`, `emoji`, `text`, `expiresAt` opcional); es independiente del estado personalizado de Discord.
- La reproducción de una pista usa YouTube dentro de la página cuando `YOUTUBE_API_KEY` está configurada. Si no lo está, las pistas elegidas manualmente se abren en el reproductor embebido de Spotify.
- Las búsquedas de la lista de canciones se adelantan desde la carga de datos, con dos solicitudes de fondo como máximo y una caché persistente. Play reutiliza la pista preparada sin volver a cargarla; `Stop` conserva su búfer y cancela solicitudes pendientes.
- Roblox consulta el usuario `zahidtql12` y su juego actual. Si la presencia no está disponible, intenta usar el último juego obtenido por el bot.
- Las actividades de Discord muestran la imagen del juego cuando Discord proporciona un asset o una URL pública.
- La foto y el banner se consultan por separado de la presencia y se actualizan sin recargar. Los hashes animados conservan la animación; quitar una imagen en Discord también la elimina del perfil. `DISCORD_BOT_TOKEN` permite consultar Discord cada minuto. Sin él, la web usa los datos que publica el bot de actividad (`profile` en `/api/activity`, se refresca cada 5 minutos; hay que reiniciar el bot con el `main.py` nuevo) y, solo si el bot no los trae, un proveedor público con caché propia (hasta varias horas). También se actualizan el nombre de usuario y el nombre visible. Las fallas conservan la última imagen conocida.
- `OPEN DETAILS` aparece en actividades actuales y recientes con información disponible. `/api/game-info` resuelve automáticamente los juegos registrados por el bot: IGDB y Steam aportan descripción, capturas y ficha técnica; Roblox aporta la experiencia concreta; Discord sirve como alternativa. Sin credenciales de IGDB se conservan los demás proveedores. No se muestran fichas inventadas cuando no hay datos.
- El perfil y GitHub usan barras finas propias, sin flechas del navegador. La rueda desplaza el historial de contribuciones horizontalmente; el desplazamiento animado consume frames únicamente mientras hay movimiento y respeta la preferencia de movimiento reducido.

## Variables de entorno

Parte de `.env.example` y configura las variables en Vercel o en tu entorno de servidor:

| Variable | Uso |
| --- | --- |
| `ACTIVITY_BOT_URL` | Opcional: reemplaza `http://fi10.bot-hosting.cloud:26022/api/activity`. Si está configurada en Vercel, actualízala también al cambiar de servidor. |
| `ACTIVITY_BOT_TOKEN` | Debe coincidir con `API_TOKEN` del bot. Se envía siempre que esté definido, también con la URL por defecto. Úsalo con una URL `https://`. |
| `DISCORD_BOT_TOKEN` | Token de un bot de Discord para actualizar foto y banner directamente cada minuto. Se mantiene únicamente en el servidor. |
| `YOUTUBE_API_KEY` | Habilita audio sincronizado dentro de la página. Si falta o se agota la cuota, `/api/playback` intenta la búsqueda pública de YouTube (desactívalo con `YOUTUBE_SCRAPE_FALLBACK=off`) y devuelve el motivo en `reason`. |
| `YOUTUBE_SCRAPE_FALLBACK` | `off` desactiva la búsqueda pública de respaldo. |
| `IGDB_CLIENT_ID` / `IGDB_CLIENT_SECRET` | Opcionales: amplían las fichas de juegos con datos de IGDB. |

Nunca expongas estas variables en el navegador ni las subas al repositorio.

## Despliegue

Despliega la raíz del repositorio en Vercel. `vercel.json` ejecuta el build, publica `dist/` y mantiene las rutas `api/` sin caché. Los datos de perfil y los recursos locales viven en `public/`; se copian a `dist/` durante el build.
