import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies({
  handleSearch,
  handleCheckboxTurn,
  foundMovies,
  isShortMovie,
  request,
  handleChangeRequest,
  isLoading,
}) {
  return (
    <main className="movies">
      <SearchForm
        request={request}
        isShortMovie={isShortMovie}
        onChangeRequest={handleChangeRequest}
        onSearch={handleSearch}
        handleCheckboxTurn={handleCheckboxTurn}
      />
      <MoviesCardList cards={foundMovies} isLoading={isLoading} />
    </main>
  );
}

export default Movies;
