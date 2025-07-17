import { Container } from '@shared/components/Layout/Container/Container';
import { Header } from '@shared/components/Layout/Header/Header';
import '@styles/global.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from '@shared/components/Layout/Main/Main';

const HomePage = lazy(() => import('@/client/pages/HomePage'));
const MovieDetailsPage = lazy(() => import('@/client/pages/MovieDetailsPage'));
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
      <Main>
        <Header />
        <Container>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/details/:id" element={<MovieDetailsPage />} />
            </Routes>
          </Suspense>
        </Container>
      </Main>
    </QueryClientProvider>
  );
}

export default App;
