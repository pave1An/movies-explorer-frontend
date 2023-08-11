import { useState } from 'react';
import './Profile.css';
import '../Main/Main.css';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [isRedact, setIsRedact] = useState(false);
  const navigate = useNavigate();
  function handleRedactClick() {
    setIsRedact(true);
  }
  function handleSubmit() {
    setIsRedact(false);
  }
  function handleLogout() {
    navigate('/');
  }
  return (
    <main className="profile-content">
      <section className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form" action="#" name="profile-form" noValidate>
          <fieldset className="profile__fieldset">
            <label className="profile__label" htmlFor="user-nаme">
              Имя
              <input
                // value="Виталий"
                type="text"
                id="user-name"
                name="user-name"
                className={`profile__input ${isRedact ? 'profile__input_active' : ''}`}
                placeholder="Имя"
                minLength="2"
              />
            </label>
            <span className="profile__error"> </span>
            <label className="profile__label" htmlFor="user-email">
              E-mail
              <input
                // value="pochta@yandex.ru"
                type="email"
                id="user-email"
                name="user-email"
                className={`profile__input ${isRedact ? 'profile__input_active' : ''}`}
                placeholder="E-mail"
              />
            </label>
            <span className="profile__error"> </span>
          </fieldset>
          {isRedact && (
            <>
              <span className="profile__error profile__error_type_submit">При обновлении профиля произошла ошибка.</span>
              <button type="submit" className="profile__submit" onClick={handleSubmit}>Сохранить</button>
            </>
          )}
        </form>
        {!isRedact && (
          <>
            <button type="button" className="profile__button" onClick={handleRedactClick}>Редактировать</button>
            <button type="button" onClick={handleLogout} className="profile__button profile__button_color_red">Выйти из аккаунта</button>
          </>
        )}
      </section>
    </main>
  );
}

export default Profile;
