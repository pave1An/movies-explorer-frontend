import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="filter">
      <label htmlFor="checkbox" className="filter__checkbox-label">
        Короткометражки
        <input className="filter__checkbox" id="checkbox" type="checkbox" />
        <div className="filter__toggler-slider" />
      </label>
    </div>
  );
}

export default FilterCheckbox;
