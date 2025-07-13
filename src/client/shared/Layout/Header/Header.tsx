import logo from '@assets/logo.svg';
import { Container } from '../Container/Container';
import './Header.scss';

export const Header = () => (
  <header className="header">
    <Container>
      <a aria-label="Homepage" aria-current="page" href="#" target="_self">
        <img src={logo} className="header__logo" alt="MyTheresa logo" />
      </a>
    </Container>
  </header>
);
