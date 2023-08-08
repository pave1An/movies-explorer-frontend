import './Form.css';
import { Link } from 'react-router-dom';

function Form({
  title, buttonText, isFormValid, children, question, link, linkText, name,
}) {
  return (
    <div className="form">
      <Link to="/" className="form__logo-link" />
      <h2 className="form__header">{title}</h2>
      <form
        action="#"
        name={name}
        className="form__form"
        noValidate
      >
        {children}
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
    </div>
  );
}

export default Form;
