import './Profile.css';
import '../Main/Main.css';
import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Profile({ handlePatchUserInfo, onSignOut }) {
  const [isRedact, setIsRedact] = useState(false);

  const { name: currentUserName, email: currentUserEmail } = useContext(CurrentUserContext);
  const {
    values, errors, isAllFieldsValid, resetForm, handleChange,
  } = useFormWithValidation();

  const isSubmitDisable = !isAllFieldsValid
  && (currentUserName === values.name && currentUserEmail === values.email);

  function handleRedactClick() {
    setIsRedact(true);
  }
  function handleSubmit(e) {
    const { name, email } = values;
    e.preventDefault();
    handlePatchUserInfo({ name, email });
    setIsRedact(false);
  }

  useEffect(() => {
    resetForm({ name: currentUserName, email: currentUserEmail });
  }, [currentUserName, currentUserEmail, resetForm]);

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
                required
              />
            </label>
            <span className="profile__error">{errors.email}</span>
          </fieldset>
          {isRedact && (
            <>
              <span className="profile__error profile__error_type_submit">При обновлении профиля произошла ошибка.</span>
              <button type="submit" className={`profile__submit ${isSubmitDisable ? 'profile__submit_disable' : ''}`} onClick={handleSubmit}>Сохранить</button>
            </>
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
