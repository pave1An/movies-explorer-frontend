import './App.css';
import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';
import {
  useCallback, useEffect, useLayoutEffect, useState,
} from 'react';
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
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';
import useErrorsWithMessges from '../../utils/handleMessages';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });

  const [allMovies, setAllMovies] = useState([]);
  const [requestText, setRequestText] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [moviesForRender, setMoviesForRender] = useState([]);
  const [moviesFilteredByText, setMoviesFilteredByText] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { handleError, errorMessage, deleteMessage } = useErrorsWithMessges();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isRootPath = pathname === '/';
  const isLocationForHeader = ['/', '/movies', '/profile', '/saved-movies'].includes(pathname);
  const isLocationForFooter = ['/', '/movies', '/saved-movies'].includes(pathname);

  const checkToken = useCallback(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    if (userLoggedIn === 'true') {
      mainApi
        .getUserInfo()
        .then(({ name, email }) => {
          if (email) {
            setIsLoggedIn(true);
            setCurrentUser({ name, email });
            if (pathname === '/signin'
              || pathname === '/signup') {
              navigate('/movies', { replace: true });
            } else {
              navigate(pathname, { replace: true });
            }
          }
        })
        .catch(console.error);
    }
  }, []);

  function handleLogin({ email, password }) {
    mainApi.login({ email, password })
      .then((res) => {
        if (res.email) {
          localStorage.setItem('userLoggedIn', true);
          setIsLoggedIn(true);
          navigate('/movies', { replace: true });
          setCurrentUser(res);
          deleteMessage();
        }
      })
      .catch((err) => handleError('user', err));
  }

  function handleRegister({ email, password, name }) {
    mainApi.register({ email, password, name })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        handleError('user', err);
      });
  }

  function handlePatchUserInfo(userData) {
    mainApi
      .patchUserInfo(userData)
      .then(({ name, email }) => setCurrentUser({ name, email }))
      .catch(console.error);
  }

  function deleteDataFromLocalstorage() {
    const dataNames = ['userLoggedIn', 'requestText', 'is-short-movies', 'movies-filtered-by-text'];
    dataNames.forEach((key) => { localStorage.removeItem(key); });
  }

  function resetSearchData() {
    setRequestText('');
    setMoviesForRender([]);
    setMoviesFilteredByText([]);
    setIsShortMovies(false);
  }

  function handleSignOut() {
    mainApi
      .signOut()
      .then(() => {
        setCurrentUser({});
        setSavedMovies([]);
        setIsLoggedIn(false);
        resetSearchData();
        deleteDataFromLocalstorage();
        navigate('/', { replace: true });
      })
      .catch(console.error);
  }

  function handleChangeRequestText(e) {
    setRequestText(e.target.value);
  }

  function filterMoviesByShort(movies, isShort) {
    if (isShort) {
      return movies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
    }
    return movies;
  }

  function filterMoviesByText(movies, text) {
    return movies.filter((movie) => movie.nameRU.toLowerCase().includes(text.toLowerCase())
        || movie.nameEN.toLowerCase().includes(text.toLowerCase()));
  }

  function saveRequestWithMoviesToStorage(text, movies) {
    if (pathname === '/movies') {
      localStorage.setItem('requestText', text);
      localStorage.setItem('movies-filtered-by-text', JSON.stringify(movies));
    }
  }

  function handleMoviesForRender(movies, text, isShort) {
    const filterByTextResult = filterMoviesByText(movies, text);
    setMoviesFilteredByText(filterByTextResult);
    const filterByShortResult = filterMoviesByShort(filterByTextResult, isShort);
    setMoviesForRender(filterByShortResult);

    saveRequestWithMoviesToStorage(text, filterByTextResult);
  }

  function saveCheckBoxStateToStorage(state) {
    if (pathname === '/movies') localStorage.setItem('is-short-movies', state);
  }

  function handleCheckboxTurn() {
    setIsLoading(true);
    setIsShortMovies((checkBoxState) => {
      const newCheckboxState = !checkBoxState;
      if (moviesFilteredByText.length > 0) {
        const filterByShortResult = filterMoviesByShort(moviesFilteredByText, newCheckboxState);
        setMoviesForRender(filterByShortResult);
        saveCheckBoxStateToStorage(newCheckboxState);
        return newCheckboxState;
      }
      return newCheckboxState;
    });
    setIsLoading(false);
  }

  function handleSearchForMoviesPage() {
    setIsLoading(true);
    if (allMovies.length === 0) {
      moviesApi
        .getMovies()
        .then((movies) => {
          setAllMovies(movies);
          handleMoviesForRender(movies, requestText, isShortMovies);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      handleMoviesForRender(allMovies, requestText, isShortMovies);
      setIsLoading(false);
    }
  }

  function handleSearchForSavedMoviesPage() {
    setIsLoading(true);
    handleMoviesForRender(savedMovies, requestText, isShortMovies);
    setIsLoading(false);
  }

  function handleSaveMovie(likedMovie) {
    mainApi.postMovie(likedMovie)
      .then((movie) => setSavedMovies([movie, ...savedMovies]))
      .catch(console.error);
  }

  function deletMovie(movieForDelete) {
    setSavedMovies(savedMovies.filter((savedMovie) => savedMovie._id !== movieForDelete._id));
    if (pathname === '/saved-movies') {
      setMoviesForRender(
        moviesForRender.filter((filteredMovie) => (
          movieForDelete.movieId !== filteredMovie.movieId
        )),
      );
      setMoviesFilteredByText(
        moviesFilteredByText.filter((movie) => (
          movieForDelete.movieId !== movie.movieId
        )),
      );
    }
  }

  function handleDeleteMovie(dislikedMovie) {
    const movieForDelete = savedMovies.find(
      (savedMovie) => dislikedMovie?.id === savedMovie.movieId
      || dislikedMovie._id === savedMovie._id,
    );
    mainApi.deleteMovie(movieForDelete._id)
      .then(() => {
        deletMovie(movieForDelete);
      })
      .catch(console.error);
  }

  function handleCheckIsMovieLiked(likedMovie) {
    return savedMovies.some((savedMovie) => likedMovie.id === savedMovie.movieId);
  }

  function recoverSearchFromLocalstorage() {
    setIsLoading(true);
    const savedRequest = localStorage.getItem('requestText') || '';
    const savedIsShort = JSON.parse(localStorage.getItem('is-short-movies')) || false;
    const savedMoviesFilteredByText = JSON.parse(localStorage.getItem('movies-filtered-by-text')) || [];
    setRequestText(savedRequest);
    setIsShortMovies(savedIsShort);
    setMoviesFilteredByText(savedMoviesFilteredByText);
    handleMoviesForRender(savedMoviesFilteredByText, savedRequest, savedIsShort);
    setIsLoading(false);
  }

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  useLayoutEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      mainApi
        .getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies);
          if (pathname === '/saved-movies') handleMoviesForRender(movies, '', false);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isLocationForHeader && <Header isRootPath={isRootPath} isLoggedIn={isLoggedIn} /> }
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} errorMessage={errorMessage} />} />
          <Route path="/signin" element={<Login onLogin={handleLogin} errorMessage={errorMessage} />} />
          <Route
            path="/movies"
            element={(
              <ProtectedRouteElement
                element={Movies}
                requestText={requestText}
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
                isShortMovies={isShortMovies}
                moviesForRender={moviesForRender}
                handleDeleteMovie={handleDeleteMovie}
                handleSaveMovie={handleSaveMovie}
                handleSearchForMoviesPage={handleSearchForMoviesPage}
                handleCheckboxTurn={handleCheckboxTurn}
                handleChangeRequestText={handleChangeRequestText}
                handleCheckIsMovieLiked={handleCheckIsMovieLiked}
                recoverSearchFromLocalstorage={recoverSearchFromLocalstorage}
              />
            )}
          />
          <Route
            path="/saved-movies"
            element={(
              <ProtectedRouteElement
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                requestText={requestText}
                isLoading={isLoading}
                savedMovies={savedMovies}
                moviesForRender={moviesForRender}
                isShortMovies={isShortMovies}
                handleDeleteMovie={handleDeleteMovie}
                handleCheckboxTurn={handleCheckboxTurn}
                handleChangeRequestText={handleChangeRequestText}
                handleCheckIsMovieLiked={handleCheckIsMovieLiked}
                handleSearchForSavedMoviesPage={handleSearchForSavedMoviesPage}
                resetSearchData={resetSearchData}
                handleMoviesForRender={handleMoviesForRender}
                setIsLoading={setIsLoading}
              />
            )}
          />
          <Route
            path="/profile"
            element={(
              <ProtectedRouteElement
                element={Profile}
                isLoggedIn={isLoggedIn}
                handlePatchUserInfo={handlePatchUserInfo}
                onSignOut={handleSignOut}
              />
            )}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        {isLocationForFooter && <Footer /> }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
