import './Header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';

function Header({ isRootPath, isLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleBurgerClick() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <header className={`header ${isRootPath ? 'header_theme_dark' : ''}`}>
      <Link className="header__logo-link" to="/" />
      <Navigation isOpen={isMenuOpen} isRootPath={isRootPath} isLoggedIn={isLoggedIn} />
      {isLoggedIn && (
        <button
          onClick={handleBurgerClick}
          className={`header__burger-button ${isRootPath && !isMenuOpen ? 'header__burger-button_theme_dark' : ''} ${isMenuOpen ? 'header__burger-button_type_close' : ''}`}
          type="button"
          name="burger"
          aria-label="Открыть меню навигации"
        />
      )}
    </header>
  );
}

export default Header;
