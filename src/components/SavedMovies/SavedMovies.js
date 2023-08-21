import { useEffect } from 'react';
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
}) {
  useEffect(() => {
    setIsLoading(true);
    resetSearchData();
    handleMoviesForRender(savedMovies, '', false);
    setIsLoading(false);
  }, []);
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
      />
    </main>
  );
}

export default SavedMovies;
