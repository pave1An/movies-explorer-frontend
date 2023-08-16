import './App.css';
import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';
import { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import moviesApi from '../../utils/MoviesApi';
import CurrentWindowWidthContext from '../../contexts/CurrentWindowWidth';
// import { shortMovieDuration } from '../../utils/constants';
import widtowWidth from '../../hooks/useWindowResize';
import mainApi from '../../utils/MainApi';

function App() {
  const { pathname } = useLocation();
  const isLocationForHeader = ['/', '/movies', '/profile', '/saved-movies'].includes(pathname);
  const isLocationForFooter = ['/', '/movies', '/saved-movies'].includes(pathname);
  // const [loggedIn, setIsLoggedIn] = useState(false);
  const isRootPath = pathname === '/';
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [request, setRequest] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleChangeRequest(e) {
    setRequest(e.target.value);
  }

  function turnCheckbox() {
    setIsShortMovie(!isShortMovie);
  }

  function filterMovies(movies, isShort) {
    const lowerCaseRequest = request.toLowerCase();
    return (movies.filter(
      (movie) => {
        if (isShort && movie.duration > 40) return false;
        return movie.nameRU.toLowerCase().includes(lowerCaseRequest)
        || movie.nameEN.toLowerCase().includes(lowerCaseRequest);
      },
    ));
  }

  function handleRegister({ email, password, name }) {
    mainApi.registration({ email, password, name })
      .then(() => {
        navigate('/signin', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function searchMovies(isShort) {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((receivedMovies) => {
        const filterResult = filterMovies(receivedMovies, isShort);
        setFoundMovies(filterResult);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleSearch() {
    searchMovies(isShortMovie);
  }

  function handleCheckboxTurn() {
    if (request) searchMovies(!isShortMovie);
    turnCheckbox();
  }

  return (
    <CurrentWindowWidthContext.Provider value={widtowWidth}>
      <div className="page">
        {isLocationForHeader && <Header isRootPath={isRootPath} /> }
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} />} />
          <Route path="/signin" element={<Login />} />
          <Route
            path="/movies"
            element={(
              <Movies
                request={request}
                foundMovies={foundMovies}
                isShortMovie={isShortMovie}
                handleSearch={handleSearch}
                handleCheckboxTurn={handleCheckboxTurn}
                handleChangeRequest={handleChangeRequest}
                isLoading={isLoading}
              />
            )}
          />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        {isLocationForFooter && <Footer /> }
      </div>
    </CurrentWindowWidthContext.Provider>
  );
}

export default App;
