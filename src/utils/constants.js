// export const NAME_REGEXP = /^[^\s][\wа-яА-Я0-9 -]+$/;
export const MOVIES_BASE_URL = 'https://api.nomoreparties.co';
export const SHORT_MOVIE_DURATION = 40;

export const SCREEN_SIZE_LARGE = 1200;
export const SCREEN_SIZE_MEDIUM = 900;
export const SCREEN_SIZE_SMALL = 600;

export const AMOUNT_CARDS_FOR_OVER_LARGE = 16;
export const AMOUNT_CARDS_FOR_LARGE = 12;
export const AMOUNT_CARDS_FOR_MEDIUM = 8;
export const AMOUNT_CARDS_FOR_SMALL = 5;

export const EXTRA_CARDS_FOR_OVER_LARGE = 4;
export const EXTRA_CARDS_FOR_LARGE = 3;
export const EXTRA_CARDS_FOR_MEDIUM = 2;
export const EXTRA_CARDS_FOR_SMALL = 2;

export const ERROR_TEXTS = {
  400: {
    default: 'Переданы некорректные данные запроса',
  },

  401: {
    movies: 'Токен не передан или передан не в том формате.',
    token: 'Токен не передан или передан не в том формате.',
    default: 'Вы ввели неправильный логин или пароль.',
  },

  403: {
    default: 'Запрос отклонен или запрещен',
  },

  404: {
    default: '404 Страница по указанному маршруту не найдена.',
  },

  409: {
    default: 'Данный email уже используется',
  },

  500: {
    default: '500 На сервере произошла ошибка.',
  },

  default: {
    default: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  },
};

export const MESSAGE_TEXTS = {
  movies: {
    'empty-here': 'Здесь пока ничего нет...',
    'empty-result': 'Ничего не найдено',
    'empty-request': 'Нужно ввести ключевое слово',
  },

  user: {
    'data-saved': 'Данные успешно сохранены!',
  },
};
