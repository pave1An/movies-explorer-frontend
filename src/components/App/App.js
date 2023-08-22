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
import useErrorsMessages from '../../hooks/useErrorsWithMessages';

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

  const {
    handleError, handleMessage, errorText, messageText, deleteMessages,
  } = useErrorsMessages();

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
        .catch((err) => handleError(err, 'token'));
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
          deleteMessages();
        }
      })
      .catch((err) => handleError(err, 'login'));
  }

  function handleRegister({ email, password, name }) {
    mainApi.register({ email, password, name })
      .then(() => {
        handleLogin({ email, password });
        deleteMessages();
      })
      .catch((err) => handleError(err, 'register'));
  }

  function handlePatchUserInfo(userData, handleSubmitState) {
    mainApi
      .patchUserInfo(userData)
      .then(({ name, email }) => {
        setCurrentUser({ name, email });
        handleSubmitState();
        deleteMessages();
        handleMessage('user', 'data-saved');
      })
      .catch((err) => handleError(err));
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
        deleteMessages();
      })
      .catch((err) => handleError(err));
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

  function showMessageIfEmptyResult(movies) {
    if (movies.length === 0) {
      handleMessage('movies', 'empty-result');
    }
    if (movies.length !== 0) {
      deleteMessages();
    }
  }

  function handleMoviesForRender(movies, text, isShort) {
    const filterByTextResult = filterMoviesByText(movies, text);
    const filterByShortResult = filterMoviesByShort(filterByTextResult, isShort);

    setMoviesFilteredByText(filterByTextResult);
    setMoviesForRender(filterByShortResult);
    saveRequestWithMoviesToStorage(text, filterByTextResult);
    showMessageIfEmptyResult(filterByShortResult);
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
        showMessageIfEmptyResult(filterByShortResult);
        setMoviesForRender(filterByShortResult);
        saveCheckBoxStateToStorage(newCheckboxState);
        return newCheckboxState;
      }
      return newCheckboxState;
    });
    setIsLoading(false);
  }

  function handleSearchForMoviesPage() {
    if (requestText === '') {
      handleMessage('movies', 'empty-request');
      return;
    }
    deleteMessages();
    setIsLoading(true);
    if (allMovies.length === 0) {
      moviesApi
        .getMovies()
        .then((movies) => {
          setAllMovies(movies);
          handleMoviesForRender(movies, requestText, isShortMovies);
        })
        .catch((err) => handleError(err, 'movies'))
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
      .catch((err) => (handleError(err, 'movies')));
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
      .catch((err) => handleError(err, 'movies'));
  }

  function handleCheckIsMovieLiked(likedMovie) {
    return savedMovies.some((savedMovie) => likedMovie.id === savedMovie.movieId);
  }

  function recoverSearchFromLocalstorage() {
    setIsLoading(true);
    const savedRequest = localStorage.getItem('requestText') || '';
    if (!savedRequest) {
      handleMessage('movies', 'empty-here');
      setIsLoading(false);
      return;
    }
    const savedMoviesFilteredByText = JSON.parse(localStorage.getItem('movies-filtered-by-text')) || [];
    const savedIsShort = JSON.parse(localStorage.getItem('is-short-movies')) || false;
    setRequestText(savedRequest);
    setIsShortMovies(savedIsShort);
    setMoviesFilteredByText(savedMoviesFilteredByText);
    handleMoviesForRender(savedMoviesFilteredByText, savedRequest, savedIsShort);
    setIsLoading(false);
  }

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  useEffect(() => {
    deleteMessages();
  }, [pathname]);

  useLayoutEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      mainApi
        .getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies);
          if (pathname === '/saved-movies') {
            if (movies.legth === 0) {
              handleMessage('movies', 'empty-here');
            } else handleMoviesForRender(movies, '', false);
          }
        })
        .catch((err) => handleError(err, 'movies'))
        .finally(() => setIsLoading(false));
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isLocationForHeader && <Header isRootPath={isRootPath} isLoggedIn={isLoggedIn} /> }
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} errorText={errorText} />} />
          <Route path="/signin" element={<Login onLogin={handleLogin} errorText={errorText} />} />
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
                errorText={errorText}
                messageText={messageText}
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
                errorText={errorText}
                messageText={messageText}
                handleMessage={handleMessage}
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
                errorText={errorText}
                messageText={messageText}
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
