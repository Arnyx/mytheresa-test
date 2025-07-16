import logo from '@assets/logo.svg';
import { Container } from '../Container/Container';
import './Header.scss';
import { Link } from 'react-router-dom';

export const Header = () => (
  <header className="header">
    <Container>
      <Link to={`/`} aria-label="Homepage" aria-current="page" target="_self">
        <img src={logo} className="header__logo" alt="MyTheresa logo" />
      </Link>
    </Container>
  </header>
);
