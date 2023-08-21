import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { MOVIES_BASE_URL } from '../../utils/constants';

function MoviesCard({
  movie, onSaveMovie, onDeleteMovie, isLike, onChekIsMovieLiked,
}) {
  const {
    image, nameRU: title, duration, trailerLink,
  } = movie;
  const { pathname } = useLocation();
  const durationInHours = duration > 60 ? `${parseInt(duration / 60, 10)}ч${duration % 60}м` : `${duration}м`;

  function handleImageUrl() {
    if (typeof image === 'object') {
      return MOVIES_BASE_URL + (image.formats.medium?.url
      || image.formats.small?.url
      || image.formats.thumbnail.url);
    }
    return image;
  }

  function handleLike() {
    if (!isLike) {
      onSaveMovie(movie);
    } else {
      onDeleteMovie(movie);
    }
    onChekIsMovieLiked(movie);
  }

  function handleDelete() {
    onDeleteMovie(movie);
  }

  return (
    <li className="movie">
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img className="movie__image" alt={`Постер к видео ${title}`} src={handleImageUrl()} />
      </a>
      <div className="movie__card-bottom">
        <h2 className="movie__title">{title}</h2>
        {pathname === '/movies'
          ? (
            <button
              type="button"
              className={`movie__save-button ${isLike ? 'movie__save-button_active' : ''}`}
              aria-label="Сохранить фильм"
              onClick={handleLike}
            />
          )
          : (
            <button
              type="button"
              className="movie__delete-button"
              aria-label="Удалить фильм"
              onClick={handleDelete}
            />
          )}
        <p className="movie__duration">{durationInHours}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
