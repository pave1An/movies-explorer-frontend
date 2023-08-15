import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({
  handleCheckboxTurn, onChangeRequest, request, onSearch, isShortMovie,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearch();
  }
  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit} noValidate>
        <div className="search-form__cover">
          <input
            className="search-form__input"
            value={request}
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
          isShortMovie={isShortMovie}
        />
      </form>
    </section>
  );
}

export default SearchForm;
