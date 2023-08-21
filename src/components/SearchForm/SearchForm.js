import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({
  handleCheckboxTurn, onChangeRequest, requestText, onSearchMovies, isShortMovies,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearchMovies();
  }
  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit} noValidate>
        <div className="search-form__cover">
          <input
            className="search-form__input"
            value={requestText || ''}
            placeholder="Фильм"
            name="search-input"
            type="text"
            required="required"
            minLength="2"
            onChange={onChangeRequest}
          />
          <button
            className="search-form__submit"
            type="submit"
            aria-label="Начать поиск"
          />
        </div>
        <FilterCheckbox
          onCheckboxTurn={handleCheckboxTurn}
          isShortMovies={isShortMovies}
        />
      </form>
    </section>
  );
}

export default SearchForm;
