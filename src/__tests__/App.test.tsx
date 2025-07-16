import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../client/App';

test.skip('increments counter', async () => {
  render(<App />);

  expect(screen.getByText('count is 0')).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button'));
  expect(screen.getByText('count is 1')).toBeInTheDocument();
});
