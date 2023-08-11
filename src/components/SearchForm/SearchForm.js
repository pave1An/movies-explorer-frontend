import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form" noValidate>
        <div className="search-form__cover">
          <input
            className="search-form__input"
            // value=""
            placeholder="Фильм"
            name="search-input"
            type="text"
            required="required"
            minLength="2"
          />
          <button
            className="search-form__submit"
            type="submit"
            aria-label="Начать поиск"
          />
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;
