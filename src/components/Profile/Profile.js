import './Profile.css';
import '../Main/Main.css';
import {
  useContext, useEffect, useState,
} from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Profile({
  handlePatchUserInfo, onSignOut, errorText, messageText,
}) {
  const [isRedact, setIsRedact] = useState(false);

  const { name: currentUserName, email: currentUserEmail } = useContext(CurrentUserContext);

  const {
    values, errors, resetForm, handleChange, isFormValid,
  } = useFormWithValidation();

  const submitState = (isFormValid && ((currentUserName !== values.name) || (currentUserEmail !== values.email))) ? '' : 'disable';

  function handleRedactClick() {
    setIsRedact(true);
  }

  function handleSubmit(e) {
    const { name, email } = values;
    e.preventDefault();
    handlePatchUserInfo({ name, email }, () => setIsRedact(false));
  }

  useEffect(() => {
    resetForm({ name: currentUserName, email: currentUserEmail });
  }, [CurrentUserContext]);

  return (
    <main className="profile-content">
      <section className="profile">
        <h1 className="profile__title">{`Привет, ${currentUserName}`}</h1>
        <form className="profile__form" action="#" name="profile-form" noValidate>
          <fieldset className="profile__fieldset">
            <label className="profile__label" htmlFor="user-nаme">
              Имя
              <input
                value={values.name || ''}
                type="text"
                id="name"
                name="name"
                className={`profile__input ${isRedact ? 'profile__input_active' : ''}`}
                placeholder="Имя"
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                disabled={!isRedact}
                pattern="^[a-zA-Zа-яА-Я\s\-]+$"
                required
              />
            </label>
            <span className="profile__error">{errors.name}</span>
            <label className="profile__label" htmlFor="user-email">
              E-mail
              <input
                value={values.email || ''}
                type="email"
                id="email"
                name="email"
                className={`profile__input ${isRedact ? 'profile__input_active' : ''}`}
                placeholder="E-mail"
                onChange={handleChange}
                disabled={!isRedact}
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                required
              />
            </label>
            <span className="profile__error">{errors.email}</span>
          </fieldset>
          <span
            className={`profile__error profile__error_type_submit ${messageText && !errorText ? 'profile__error_type_message' : ''}`}
          >
            {isRedact ? errorText : messageText}
          </span>
          {isRedact && (
            <button
              type="submit"
              className={`profile__submit ${submitState ? 'profile__submit_disable' : ''}`}
              onClick={handleSubmit}
              disabled={submitState}
            >
              Сохранить
            </button>
          )}
        </form>
        {!isRedact && (
          <>
            <button type="button" className="profile__button" onClick={handleRedactClick}>Редактировать</button>
            <button type="button" onClick={onSignOut} className="profile__button profile__button_color_red">Выйти из аккаунта</button>
          </>
        )}
      </section>
    </main>
  );
}

export default Profile;
