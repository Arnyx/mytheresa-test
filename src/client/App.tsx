import '@styles/global.scss';
import { Container } from '@shared/Layout/Container/Container';
import { Header } from '@shared/Layout/Header/Header';
import { Movies } from '@features/Movies/Movies';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

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
        <Movies />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
