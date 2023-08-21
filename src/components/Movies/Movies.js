import './Movies.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import useWindowResize from '../../hooks/useWindowResize';
import useCardListRender from '../../hooks/useCardListRender';

function Movies({
  requestText,
  handleSearchForMoviesPage,
  handleCheckboxTurn,
  moviesForRender,
  isShortMovies,
  handleChangeRequestText,
  isLoading,
  handleSaveMovie,
  handleDeleteMovie,
  handleCheckIsMovieLiked,
  recoverSearchFromLocalstorage,
}) {
  const { pathname } = useLocation();
  const { width } = useWindowResize();
  const { cardsForRender, handleRenderedCards, handleAddCards } = useCardListRender();

  const isAddButtonEnable = (moviesForRender.length > cardsForRender.length) && !isLoading && pathname === '/movies';

  function handleAddCardsButton() {
    handleAddCards(moviesForRender, width);
  }

  useEffect(() => {
    recoverSearchFromLocalstorage();
  }, []);

  useEffect(() => {
    handleRenderedCards(moviesForRender, width);
  }, [moviesForRender, width, handleRenderedCards]);

  return (
    <main className="movies">
      <SearchForm
        requestText={requestText}
        isShortMovies={isShortMovies}
        onChangeRequest={handleChangeRequestText}
        onSearchMovies={handleSearchForMoviesPage}
        handleCheckboxTurn={handleCheckboxTurn}
      />
      <MoviesCardList
        movies={cardsForRender}
        isLoading={isLoading}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
        handleCheckIsMovieLiked={handleCheckIsMovieLiked}
        onAddCardsButton={handleAddCardsButton}
        isAddButtonEnable={isAddButtonEnable}
      />
    </main>
  );
}

export default Movies;
