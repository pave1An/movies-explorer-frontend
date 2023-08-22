import './Register.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import Form from '../Form/Form';
import Input from '../Input/Input';

function Register({ onRegister, errorText }) {
  const {
    values, errors, isFormValid, handleChange,
  } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = values;
    onRegister({ name, email, password });
  }

  return (
    <main className="register-content">
      <Form
        onSubmit={handleSubmit}
        name="register"
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        isFormValid={isFormValid}
        question="Уже зарегистрированы?"
        link="/signin"
        linkText="Войти"
        errorText={errorText}
      >
        <fieldset className="form__fieldset">
          <Input
            name="name"
            type="text"
            required="required"
            labelText="Имя"
            minLength="2"
            maxLength="30"
            onChange={handleChange}
            errors={errors}
            values={values}
            pattern="^[a-zA-Zа-яА-Я\s\-]+$"
          />
          <Input
            name="email"
            type="email"
            required="required"
            labelText="E-mail"
            onChange={handleChange}
            errors={errors}
            values={values}
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          />
          <Input
            name="password"
            type="password"
            required="required"
            labelText="Пароль"
            minLength="3"
            maxLength="30"
            onChange={handleChange}
            errors={errors}
            values={values}
          />
        </fieldset>
      </Form>
    </main>
  );
}

export default Register;
