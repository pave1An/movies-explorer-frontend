import './MoviesCard.css';

function MoviesCard({ imageLink, title, duration }) {
  return (
    <li className="movie">
      <img className="movie__image" alt="Постер" src={imageLink} />
      <div className="movie__title-button-cover">
        <h2 className="movie__title">{title}</h2>
        <button type="button" className="movie__button" aria-label="Сохранить фильм себе" />
      </div>
      <p className="movie__duration">{duration}</p>
    </li>
  );
}

export default MoviesCard;
