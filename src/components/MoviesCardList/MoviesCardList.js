import { movies } from '../../utils/constants';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList() {
  return (
    <section className="movies-grid">
      <ul className="movies-grid__list">
        {movies.map((card) => (
          <MoviesCard
            key={card.id}
            imageLink={card.image.formats.thumbnail.url}
            title={card.nameRU}
            duration={card.duration}
          />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
