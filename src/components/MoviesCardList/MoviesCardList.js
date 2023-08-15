import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import useWindowResize from '../../hooks/useWindowResize';
import useCardListRender from '../../hooks/useCardListRender';

function MoviesCardList({ cards, isLoading }) {
  const { width } = useWindowResize();
  const { cardsForRender, handleRenderedCards, handleAddCardsClick } = useCardListRender();
  const { pathname } = useLocation();

  function handleClick() {
    handleAddCardsClick(cards, width);
  }

  const isButtonVisible = (cards.length > cardsForRender.length) && !isLoading && pathname === '/movies';

  useEffect(() => {
    handleRenderedCards(cards, width);
  }, [cards, width, handleRenderedCards]);

  return (
    <section className="movies-grid">
      <p className="movies-grid__text">Здесь пока ничего нет...</p>
      {isLoading
        ? (<Preloader />)
        : (
          <ul className="movies-grid__list">
            {cardsForRender.map((card) => (
              <MoviesCard
                key={card.id}
                image={card.image}
                title={card.nameRU}
                duration={card.duration}
                trailerLink={card.trailerLink}
              />
            ))}
          </ul>
        )}
      {isButtonVisible
      && <button className="movies-grid__button" onClick={handleClick} type="button">Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
