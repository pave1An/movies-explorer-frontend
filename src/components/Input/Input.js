function Input({
  name, type, labelText, required, minLength = '', errorText = 'asdfasdfasdf',
}) {
  return (
    <>
      <label className="form__label" htmlFor={name}>{labelText}</label>
      <input
        // value={values.email || ''}
        // onChange={handleChange}
        id={name}
        name={name}
        className="form__input"
        type={type}
        required={required}
        minLength={minLength}
      />
      <span className="form__error">{errorText}</span>
    </>
  );
}

export default Input;
