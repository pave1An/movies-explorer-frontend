import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { savedMovies } from '../../utils/constants';

function SavedMovies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList cards={savedMovies} />
    </main>
  );
}

export default SavedMovies;
