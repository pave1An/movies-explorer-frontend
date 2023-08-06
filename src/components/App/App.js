import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
  const { pathname } = useLocation();
  const isLocationForHeaderFooter = ['/', '/movies', '/profile', '/saved-movies'].includes(pathname);
  const [loggedIn] = useState(true);

  return (
    <div className="page">
      {isLocationForHeaderFooter && <Header isLoggedIn={loggedIn} /> }
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {isLocationForHeaderFooter && <Footer /> }
    </div>
  );
}

export default App;
