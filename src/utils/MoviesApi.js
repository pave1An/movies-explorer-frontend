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
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl + endpoint}`, options).then(this._handleFirstResponse);
  }

  getMovies() {
    return this._request('/beatfilm-movies');
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_BASE_URL,
});

export default moviesApi;
