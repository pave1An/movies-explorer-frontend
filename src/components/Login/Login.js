import './Login.css';
import Form from '../Form/Form';
import Input from '../Input/Input';

function Login() {
  const isFormValid = true;
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
      >
        <fieldset className="form__fieldset">
          <Input
            name="email"
            type="email"
            required="required"
            labelText="E-mail"
            minLength="2"
          />
          <Input
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
