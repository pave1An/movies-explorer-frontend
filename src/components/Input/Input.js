function Input({
  name, type, labelText, required, minLength = 0, errorText = '',
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
        placeholder={labelText}
      />
      <span className="form__error">{errorText}</span>
    </>
  );
}

export default Input;
