import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { Transform } from 'node:stream';
import { fileURLToPath } from 'node:url';
import type { ViteDevServer } from 'vite';
import { createServer as createViteServer } from 'vite';
import moviesRoutes from './presentation/routes/movies.routes';
import movieRoutes from './presentation/routes/movie.routes';

const ABORT_DELAY = 10000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  const PORT = 5173;

  const vite: ViteDevServer = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('/api/movies', moviesRoutes);
  app.use('/api/movie', movieRoutes);

  app.use('*all', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);

      const render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;

      let didError = false;

      const { pipe, abort } = render(url, undefined, {
        onShellError() {
          res.status(500);
          res.set({ 'Content-Type': 'text/html' });
          res.send('<h1>Something went wrong</h1>');
        },
        onShellReady() {
          res.status(didError ? 500 : 200);
          res.set({ 'Content-Type': 'text/html' });

          const transformStream = new Transform({
            transform(chunk, encoding, callback) {
              res.write(chunk, encoding);
              callback();
            },
          });

          const [htmlStart, htmlEnd] = template.split(`<!--ssr-outlet-->`);

          res.write(htmlStart);

          transformStream.on('finish', () => {
            res.end(htmlEnd);
          });

          pipe(transformStream);
        },
        onError(error: unknown) {
          didError = true;
          console.error(error);
        },
      });

      setTimeout(() => {
        abort();
      }, ABORT_DELAY);
    } catch (e) {
      vite?.ssrFixStacktrace(e as Error);
      res.status(500).end((e as Error).stack);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

createServer();
