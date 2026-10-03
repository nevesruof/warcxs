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
- Al entrar se reproduce únicamente la pista activa de Spotify, cuando está disponible. Si no hay una pista activa, la página permanece en silencio.
- Las letras proceden de LRCLIB. Las líneas LRC se resaltan según el segundo de reproducción; si no existen, se muestran las letras simples disponibles.
- La reproducción de una pista usa YouTube dentro de la página cuando `YOUTUBE_API_KEY` está configurada. Si no lo está, las pistas elegidas manualmente se abren en el reproductor embebido de Spotify.
- Las búsquedas de la lista de canciones se adelantan desde la carga de datos, con dos solicitudes de fondo como máximo y una caché persistente. Play reutiliza la pista preparada sin volver a cargarla; `Stop` conserva su búfer y cancela solicitudes pendientes.
- Roblox consulta el usuario `zahidtql12` y su juego actual. Si la presencia no está disponible, intenta usar el último juego obtenido por el bot.
- Las actividades de Discord muestran la imagen del juego cuando Discord proporciona un asset o una URL pública.
- `OPEN DETAILS` aparece en actividades actuales y recientes con información disponible. `/api/game-info` resuelve automáticamente los juegos registrados por el bot: IGDB y Steam aportan descripción, capturas y ficha técnica; Roblox aporta la experiencia concreta; Discord sirve como alternativa. Sin credenciales de IGDB se conservan los demás proveedores. No se muestran fichas inventadas cuando no hay datos.

## Variables de entorno

Parte de `.env.example` y configura las variables en Vercel o en tu entorno de servidor:

| Variable | Uso |
| --- | --- |
| `ACTIVITY_BOT_URL` | Opcional: reemplaza la URL del bot existente. Sin esta variable se conserva la conexión anterior. |
| `ACTIVITY_BOT_TOKEN` | Token opcional para ese bot. |
| `YOUTUBE_API_KEY` | Habilita audio sincronizado dentro de la página. |
| `IGDB_CLIENT_ID` / `IGDB_CLIENT_SECRET` | Opcionales: amplían las fichas de juegos con datos de IGDB. |
| `ROBLOX_COOKIE` | Cookie `.ROBLOSECURITY` que permite consultar presencia de Roblox. |

Nunca expongas estas variables en el navegador ni las subas al repositorio.

## Despliegue

Despliega la raíz del repositorio en Vercel. `vercel.json` ejecuta el build, publica `dist/` y mantiene las rutas `api/` sin caché. Los datos de perfil y los recursos locales viven en `public/`; se copian a `dist/` durante el build.
