class MainApi {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _handleFirstResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.json());
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl + endpoint}`, options).then(this._handleFirstResponse);
  }

  registration({ password, email, name }) {
    return this._request('/signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
        name,
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
}

//   getUserInfo() {
//     return this._request('/users/me', {headers: this._headers});
//   }

//   patchUserInfo(data) {
//     return this._request('/users/me', {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify({
//         name: data.name,
//         about: data.about
//       })
//     });
//   }

//   patchAvatar({ avatar }) {
//     return this._request('/users/me/avatar', {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify({
//         avatar: avatar
//       })
//     });
//   }

//   getInitialCards() {
//     return this._request('/cards', {headers: this._headers});
//   }

//   postCard(cardData) {
//     return this._request('/cards', {
//       method: 'POST',
//       headers: this._headers,
//       body: JSON.stringify({
//         name: cardData.name,
//         link: cardData.link
//       })
//     });
//   }

//   deleteCard(cardId) {
//     return this._request(`/cards/${cardId}`, {
//       method: 'DELETE',
//       headers: this._headers,
//     });
//   }

//   clickLike(cardId, isLiked) {
//     return this._request(`/cards/${cardId}/likes`, {
//       method: isLiked ? 'DELETE' : 'PUT',
//       headers: this._headers,
//     });
//   }
// }
// // ///////////
// const getMovies = (req, res, next) => {
//     Movie.find({ owner: req.user })
//       .then((movies) => {
//         res.send(movies);
//       })
//       .catch(next);
//   };

//   const postMovie = (req, res, next) => {
//     const {
//       country,
//       director,
//       duration,
//       year,
//       description,
//       image,
//       trailerLink,
//       thumbnail,
//       movieId,
//       nameRU,
//       nameEN,
//     } = req.body;
//     Movie.create({
//       country,
//       director,
//       duration,
//       year,
//       description,
//       image,
//       trailerLink,
//       thumbnail,
//       movieId,
//       nameRU,
//       nameEN,
//       owner: req.user._id,
//     })
//       .then((movie) => res.status(201).send(movie))
//       .catch(next);
//   };

//   const deleteMovie = (req, res, next) => {
//     Movie.findOne({ _id: req.params.movieId })
//       .orFail(() => new NotFoundError(errorTexts.notFoundMovie))
//       .then((movie) => {
//         const movieOwner = movie.owner.toString();
//         if (movieOwner !== req.user._id) {
//           throw new ForbiddenError(errorTexts.forbiddenMovieDelete);
//         } else {
//           const movieId = movie._id.toString();
//           Movie.deleteOne({ _id: movieId })
//             .then((data) => res.send(data))
//             .catch(next);
//         }
//       })
//       .catch(next);

// ////////
const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
