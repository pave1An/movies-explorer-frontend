import CustomError from './CustomError';
import { MOVIES_BASE_URL } from './constants';

class MoviesApi {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _handleFirstResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new CustomError(res.statusText, res.status));
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl + endpoint}`, options).then(this._handleFirstResponse);
  }

  register({ password, email, name }) {
    return this._request('/signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
  }

  login({ password, email }) {
    return this._request('/signin', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  signOut() {
    return this._request('/signout', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request('/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: this.headers,
    });
  }

  patchUserInfo(data) {
    return this._request('/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    });
  }

  getSavedMovies() {
    return this._request('/movies', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    });
  }

  postMovie(movie) {
    return this._request('/movies', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: MOVIES_BASE_URL + (movie.image.formats.medium?.url
          || movie.image.formats.small?.url
          || movie.image.formats.thumbnail.url),
        trailerLink: movie.trailerLink,
        thumbnail: MOVIES_BASE_URL + movie.image.formats.thumbnail.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    });
  }

  deleteMovie(movieId) {
    return this._request(`/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
  }
}

const mainApi = new MoviesApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
// 'https://api.moovies-explorer.nomoredomains.xyz',
