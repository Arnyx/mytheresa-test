import { Header } from '@/client/shared/components/Layout/Header/Header';
import { CurrentPath } from '@/test-utils/CurrentPath';
import { renderWithProviders } from '@/test-utils/renderWithProviders';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Layout', () => {
  describe('<Header />', () => {
    it('should render logo and redirect properly', async () => {
      renderWithProviders(
        <>
          <Header />
          <CurrentPath />
        </>
      );
      const user = userEvent.setup();

      const link = screen.getByRole('link', { name: 'Homepage' });
      const logo = within(link).getByRole('img', { name: 'MyTheresa logo' });

      expect(logo).toBeInTheDocument();

      await user.click(link);

      const path = screen.getByTestId('current-path');
      expect(path).toHaveTextContent('/');
    });
  });
});
