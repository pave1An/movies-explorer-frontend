import { useState } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { moviesBaseUrl } from '../../utils/constants';

function MoviesCard({
  image, title, duration, trailerLink,
}) {
  const durationInHours = duration > 60 ? `${parseInt(duration / 60, 10)}ч${duration % 60}м` : `${duration}м`;
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useLocation();
  const imageFormatUrl = image.formats.medium?.url
    || image.formats.small?.url
    || image.formats.thumbnail.url;
  const imageUrl = moviesBaseUrl + imageFormatUrl;
  return (
    <li className="movie">
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img className="movie__image" alt={`Постер к видео ${title}`} src={imageUrl} />
      </a>
      <div className="movie__card-bottom">
        <h2 className="movie__title">{title}</h2>
        {pathname === '/movies'
          ? (
            <button
              type="button"
              className={`movie__save-button ${isActive ? 'movie__save-button_active' : ''}`}
              aria-label="Сохранить фильм"
              onClick={() => setIsActive(!isActive)}
            />
          )
          : (
            <button
              type="button"
              className="movie__delete-button"
              aria-label="Удалить фильм"
              // onClick={}
            />
          )}
        <p className="movie__duration">{durationInHours}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
