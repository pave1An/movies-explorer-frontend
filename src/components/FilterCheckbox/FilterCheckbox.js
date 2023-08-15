import './FilterCheckbox.css';

function FilterCheckbox({ onCheckboxTurn, isShortMovie }) {
  return (
    <div className="filter">
      <label htmlFor="checkbox" className="filter__checkbox-label">
        Короткометражки
        <input className="filter__checkbox" id="checkbox" type="checkbox" onChange={onCheckboxTurn} checked={isShortMovie} />
        <span className="filter__toggler-slider" />
      </label>
    </div>
  );
}

export default FilterCheckbox;
