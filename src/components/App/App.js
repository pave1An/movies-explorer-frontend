import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
// import { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {
  const { pathname } = useLocation();
  const isLocationForHeader = ['/', '/movies', '/profile', '/saved-movies'].includes(pathname);
  const isLocationForFooter = ['/', '/movies', '/saved-movies'].includes(pathname);
  // const [loggedIn, setIsLoggedIn] = useState(false);
  const isRootPath = pathname === '/';

  return (
    <div className="page">
      {isLocationForHeader && <Header isRootPath={isRootPath} /> }
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {isLocationForFooter && <Footer /> }
    </div>
  );
}

export default App;
