import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';

function Header() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleBurgerClick() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <header className={`header ${pathname === '/' && 'header_theme_dark'}`}>
      <Link className="header__logo-link" to="/" />
      <Navigation isOpen={isMenuOpen} />
      {pathname !== '/' && (
        <button onClick={handleBurgerClick} className="header__burger-button" type="button" name="burger" aria-label="Открыть меню навигации" />
      )}
    </header>
  );
}

export default Header;
