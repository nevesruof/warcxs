# Bot de actividad

Sube `main.py`, `recorder.py`, `config.json` y `requirements.txt` a la carpeta del bot en tu hosting y reinícialo. Conserva tu `.env` y la carpeta `data/`.

El usuario seguido se configura únicamente en `config.json`: `893966003690668102`. Un `DISCORD_USER_ID` antiguo en `.env` ya no reemplaza ese valor. El bot y el nuevo usuario deben compartir un servidor con Presence Intent y Server Members Intent activados.

Se conserva el puerto configurado (`PORT=26022`), el token y el historial existente. Las actividades, canciones y estados nuevos se guardan por ID de usuario para no mezclar cuentas. Roblox sigue consultando `zahidtql12`.

La web espera este mismo ID; la actividad nueva aparecerá después de actualizar y reiniciar el bot. El repositorio no contiene credenciales.

## Seguridad de la API

- Define `API_TOKEN` en el `.env` del bot. Sin él, `/api/activity` es público y cualquiera puede leer tu historial de juegos, canciones y estados.
- En Vercel define `ACTIVITY_BOT_TOKEN` con el mismo valor. Se envía siempre que exista, también con la URL por defecto.
- El puerto sirve HTTP plano: pon HTTPS delante (por ejemplo Cloudflare Tunnel o un proxy inverso) y apunta `ACTIVITY_BOT_URL` a esa URL `https://`, para que el token no viaje en claro.
- Una sesión que se corta menos de 120 s (reconexión del gateway, fallo de Roblox) se reabre en vez de duplicarse. Las sesiones terminadas hace más de 90 días se borran una vez al día.

## Perfil (foto, banner, nombre)

El bot consulta el perfil público de la cuenta seguida cada 5 minutos y lo publica como `profile` en `/api/activity`; la web lo usa para foto, banner, usuario y nombre visible sin depender de servicios de terceros. Tras actualizar `main.py` hay que reiniciar el bot.
