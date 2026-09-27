# Página y bot de warcxs.com

Este repositorio contiene la página. El código del bot se entrega por separado en `warcxs-bot.zip`.

## Cambios

- Bio solicitada con `https://warcxs.com/`, `https://arcxsdev.com/` y `https://dsc.gg/fmsociety`, enlaces externos pulsables y subrayado blanco de 1 px.
- Desplazamiento vertical dentro de la tarjeta del perfil; soporte para rueda, tacto y teclado.
- Recent activity lee el historial del bot. La API incluye el `userId` exigido por la interfaz, identificadores estables, application ID y fechas coherentes.
- Los fallos de red devuelven un error, no una lista vacía válida. El navegador conserva su último historial y el bot guarda los registros en SQLite.
- Juegos y música se consultan por separado: las canciones no desplazan a los juegos del límite de resultados.
- El historial deja de depender de tener la página abierta. No se inventan registros ni se cambian sus fechas al refrescar.
- Los juegos ya registrados siguen apareciendo en Recent activity aunque vuelvan a estar abiertos.
- Los tiempos de inicio de actividades y Spotify se conservan entre consultas. Si no hay conexión con el bot, la presencia indica `Status unavailable`.
- Se mantiene la consulta inicial de stats.fm y su actualización cada 30 segundos. El historial de actividades se consulta cada 15 segundos; la presencia, cada 5.

## Página en Vercel

Despliega la raíz de `warcxs-main/`, con `package.json`, `api/`, `lib/`, `dist/` y `vercel.json`. No subas solo `dist/`, porque las funciones del servidor son necesarias.

El archivo `vercel.json` fija `npm run build` y salida `dist`. Configura `ACTIVITY_BOT_URL` y, si usas autenticación, `ACTIVITY_BOT_TOKEN`. Su valor debe coincidir con `API_TOKEN` del bot. Consulta `.env.example`. El dominio sigue siendo `https://www.warcxs.com/`.

## Bot

Descomprime `warcxs-bot.zip` en el hosting del bot. Sigue su `README_ES.md`, conserva la base anterior `data/activity.sqlite3`, instala las dependencias y ejecuta `python main.py`.

La corrección preserva registros existentes cuando conservas el archivo SQLite. No puede recuperar registros que ya se borraron ni observar actividad mientras el bot está apagado.

## Verificación local

- `npm ci` y `npm run build`: sintaxis y recursos.
- `node --test tests/activity.test.mjs`: contrato de la API, caché, reconexión, presencia y conservación del historial.
- En el paquete separado del bot: `python -m unittest discover -s tests -v`.

`npm run dev` sirve el frontend. Las rutas `/api/` necesitan Vercel o un entorno local que ejecute sus funciones. No se realizó ningún despliegue ni se usó un token real en estas pruebas.
