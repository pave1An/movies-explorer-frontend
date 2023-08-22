function Input({
  name, type, labelText, required, minLength, maxLength, onChange, errors, values, pattern,
}) {
  return (
    <>
      <label className="form__label" htmlFor={name}>{labelText}</label>
      <input
        id={name}
        name={name}
        className="form__input"
        type={type}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={labelText}
        onChange={onChange}
        value={values[name] || ''}
        pattern={pattern}
      />
      <span className="form__error">{errors[name] || ''}</span>
    </>
  );
}

export default Input;
