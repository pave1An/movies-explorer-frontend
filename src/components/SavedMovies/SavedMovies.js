import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList cards={[]} />
    </main>
  );
}

export default SavedMovies;
