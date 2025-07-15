import React from 'react';
import { type RenderToPipeableStreamOptions, renderToPipeableStream } from 'react-dom/server';
import App from './client/App';
import { StaticRouter } from 'react-router-dom/server';

export function render(url: string, _ssrManifest?: string, options?: RenderToPipeableStreamOptions) {
  return renderToPipeableStream(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>,
    options
  );
}
