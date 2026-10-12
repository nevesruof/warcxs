# Bot de actividad

Sube `main.py`, `recorder.py`, `config.json` y `requirements.txt` a la carpeta del bot en tu hosting y reinícialo. Conserva tu `.env` y la carpeta `data/`.

El usuario seguido se configura únicamente en `config.json`: `893966003690668102`. Un `DISCORD_USER_ID` antiguo en `.env` ya no reemplaza ese valor. El bot y el nuevo usuario deben compartir un servidor con Presence Intent y Server Members Intent activados.

Se conserva el puerto configurado (`PORT=26022`), el token y el historial existente. Las actividades, canciones y estados nuevos se guardan por ID de usuario para no mezclar cuentas. Roblox sigue consultando `zahidtql12`.

La web espera este mismo ID; la actividad nueva aparecerá después de actualizar y reiniciar el bot. El repositorio no contiene credenciales.
