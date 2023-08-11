import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ cards }) {
  return (
    <section className="movies-grid">
      <ul className="movies-grid__list">
        {cards.map((card) => (
          <MoviesCard
            key={card.id}
            imageLink={card.image.formats.thumbnail.url}
            title={card.nameRU}
            duration={card.duration}
          />
        ))}
      </ul>
      <button className="movies-grid__button" type="button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
