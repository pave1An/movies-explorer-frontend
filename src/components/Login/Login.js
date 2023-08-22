import './Login.css';
import Form from '../Form/Form';
import Input from '../Input/Input';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Login({ onLogin, errorText }) {
  const {
    values, errors, isFormValid, handleChange,
  } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;
    onLogin({ email, password });
  }

  return (
    <main className="login-content">
      <Form
        name="login"
        title="Рады видеть!"
        buttonText="Войти"
        isFormValid={isFormValid}
        question="Ещё не зарегистрированы?"
        link="/signup"
        linkText="Регистрация"
        onSubmit={handleSubmit}
        errorText={errorText}
      >
        <fieldset className="form__fieldset">
          <Input
            values={values}
            errors={errors}
            onChange={handleChange}
            name="email"
            type="email"
            required="required"
            labelText="E-mail"
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          />
          <Input
            values={values}
            errors={errors}
            onChange={handleChange}
            name="password"
            type="password"
            required="required"
            labelText="Пароль"
            minLength="3"
            maxLength="30"
          />
        </fieldset>
      </Form>
    </main>
  );
}

export default Login;
