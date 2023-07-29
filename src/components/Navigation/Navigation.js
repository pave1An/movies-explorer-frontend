import './Navigation.css';
import {
  Link, NavLink, useLocation,
} from 'react-router-dom';

function Navigation({ isOpen }) {
  const { pathname } = useLocation();
  const isRootPath = pathname === '/';
  return (
    <div className="navigation">
      {isRootPath && (
      <nav>
        <ul className="navigation__menu">
          <li>
            <Link to="/signup" className="navigation__link navigation__link_type_signup">Регистрация</Link>
          </li>
          <li>
            <Link to="/signin" className="navigation__link navigation__link_type_signin">
              Войти
            </Link>
          </li>
        </ul>
      </nav>
      )}
      {!isRootPath && (
        <nav className="navigation__cover">
          <ul className={`navigation__menu ${isOpen && 'navigation__menu_open'}`}>
            <li>
              <NavLink to="/" className={(isActive) => `navigation__link navigation__link_invisible ${isActive ? 'navigation__link_active' : ''}`}>Главная</NavLink>
            </li>
            <li>
              <NavLink to="/movies" className={(isActive) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Фильмы</NavLink>
            </li>
            <li>
              <NavLink to="/saved-movies" className={(isActive) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Сохраненные фильмы</NavLink>
            </li>
            <li>
              <Link to="/profile" className="navigation__link navigation__link_type_profile">Аккаунт</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Navigation;
