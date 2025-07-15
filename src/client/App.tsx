import { Container } from '@shared/Layout/Container/Container';
import { Header } from '@shared/Layout/Header/Header';
import '@styles/global.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

//TODO: Change server to renderToPipeableStream, or remove lazy loading

const HomePage = lazy(() => import('@/client/pages/HomePage'));
const MoviePage = lazy(() => import('@/client/pages/MoviePage'));
const NotFoundPage = lazy(() => import('@/client/pages/NotFoundPage'));

function App() {
  const STALE_TIME = 60 * 1000;
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: STALE_TIME,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:id" element={<MoviePage />} />
          </Routes>
        </Suspense>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
