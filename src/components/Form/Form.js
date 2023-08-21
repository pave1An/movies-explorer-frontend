import './Form.css';
import { Link } from 'react-router-dom';

function Form({
  title, buttonText, isFormValid, children, question, link, linkText, name, onSubmit, errorMessage,
}) {
  return (
    <section className="form">
      <Link to="/" className="form__logo-link" />
      <h1 className="form__header">{title}</h1>
      <form
        action="#"
        name={name}
        className="form__form"
        noValidate
        onSubmit={onSubmit}
      >
        {children}
        <p>{errorMessage}</p>
        <button
          type="submit"
          className={`form__button ${!isFormValid ? 'form__button_disablded' : ''}`}
          name="submit"
          disabled={!isFormValid}
        >
          {buttonText}
        </button>
      </form>
      <span className="form__text">
        {question}
        <Link className="form__link" to={link}>{` ${linkText}`}</Link>
      </span>
    </section>
  );
}

export default Form;
