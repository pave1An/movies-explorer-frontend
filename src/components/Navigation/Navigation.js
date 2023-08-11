import './Navigation.css';
import {
  Link, NavLink,
} from 'react-router-dom';

function Navigation({ isOpen, isRootPath }) {
  return (
    <div className="navigation">
      {isRootPath
        ? (
          <nav>
            <ul className="navigation__menu-unauthorized">
              <li>
                <Link to="/signup" className="navigation__link-signup">Регистрация</Link>
              </li>
              <li>
                <Link to="/signin" className="navigation__link-signin">
                  Войти
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav className={`navigation__cover ${isOpen ? 'navigation__cover_opened' : ''}`}>
            <ul className={`navigation__menu ${isOpen ? 'navigation__menu_opened' : ''}`}>
              <li className="navigation__item">
                <NavLink to="/" className={({ isActive }) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Главная</NavLink>
              </li>
              <li className="navigation__item">
                <NavLink to="/movies" className={({ isActive }) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Фильмы</NavLink>
              </li>
              <li className="navigation__item">
                <NavLink to="/saved-movies" className={({ isActive }) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Сохранённые фильмы</NavLink>
              </li>
              <li className="navigation__item">
                <Link to="/profile" className="navigation__link-profile">Аккаунт</Link>
              </li>
            </ul>
          </nav>
        )}
    </div>
  );
}

export default Navigation;
