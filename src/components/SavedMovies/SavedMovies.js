import { useCallback, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({
  requestText,
  savedMovies,
  moviesForRender,
  isLoading,
  handleDeleteMovie,
  handleCheckIsMovieLiked,
  handleSearchForSavedMoviesPage,
  handleCheckboxTurn,
  isShortMovies,
  handleChangeRequestText,
  handleMoviesForRender,
  resetSearchData,
  setIsLoading,
  messageText,
  errorText,
  handleMessage,
}) {
  const handleMessageEmptyHere = useCallback(() => {
    if (savedMovies.length === 0) {
      handleMessage('movies', 'empty-here');
    }
  }, [savedMovies]);

  useEffect(() => {
    setIsLoading(true);
    resetSearchData();
    handleMoviesForRender(savedMovies, '', false);
    setIsLoading(false);
  }, [handleMessageEmptyHere]);

  useEffect(() => {
    handleMessageEmptyHere();
  }, [handleMessageEmptyHere]);
  return (
    <main className="movies">
      <SearchForm
        requestText={requestText}
        onSearchMovies={handleSearchForSavedMoviesPage}
        handleCheckboxTurn={handleCheckboxTurn}
        isShortMovies={isShortMovies}
        onChangeRequest={handleChangeRequestText}
      />
      <MoviesCardList
        movies={moviesForRender}
        isLoading={isLoading}
        handleDeleteMovie={handleDeleteMovie}
        handleCheckIsMovieLiked={handleCheckIsMovieLiked}
        messageText={messageText}
        errorText={errorText}
      />
    </main>
  );
}

export default SavedMovies;
