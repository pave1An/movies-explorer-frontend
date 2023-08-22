import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

function MoviesCardList({
  movies,
  isLoading,
  handleSaveMovie,
  handleDeleteMovie,
  handleCheckIsMovieLiked,
  onAddCardsButton,
  isAddButtonEnable,
  messageText,
  errorText,
}) {
  return (
    <section className="movies-grid">
      <p className={`movies-grid__text ${(messageText || errorText) ? 'movies-grid__text_type_active' : ''}`}>{messageText || errorText}</p>
      {isLoading
        ? (<Preloader />)
        : (
          <ul className="movies-grid__list">
            {movies.map((movie) => (
              <MoviesCard
                key={movie?.id || movie.movieId}
                movie={movie}
                isLike={handleCheckIsMovieLiked(movie)}
                onSaveMovie={handleSaveMovie}
                onDeleteMovie={handleDeleteMovie}
                onChekIsMovieLiked={handleCheckIsMovieLiked}
              />
            ))}
          </ul>
        )}
      {isAddButtonEnable
      && <button className="movies-grid__button" onClick={onAddCardsButton} type="button">Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
