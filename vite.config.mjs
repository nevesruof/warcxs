import { defineConfig } from 'vite';

function localApi() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res, next) => {
        const route = req.url.split('?')[0].slice(1);
        if (!['presence', 'profile', 'game-activity', 'game-info', 'roblox', 'lyrics', 'playback'].includes(route))
          return next();
        try {
          const { default: handler } = await server.ssrLoadModule(`/api/${route}.js`);
          res.status = (status) => {
            res.statusCode = status;
            return res;
          };
          res.json = (value) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(value));
          };
          await handler(req, res);
        } catch {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Local API failed' }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [localApi()],
  server: { host: '0.0.0.0', port: 4173, strictPort: true },
  build: { target: 'es2022', emptyOutDir: true },
});
