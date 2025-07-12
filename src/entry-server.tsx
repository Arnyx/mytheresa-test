import App from './client/App';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

export async function render(url: string): Promise<string> {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
