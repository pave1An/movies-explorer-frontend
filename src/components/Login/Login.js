import Form from '../Form/Form';
import Input from '../Input/Input';

function Login() {
  const isFormValid = true;
  return (
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
        <Input name="email" type="email" required="required" labelText="E-mail" />
        <Input name="password" type="password" required="required" labelText="Пароль" minLength="3" />
      </fieldset>
    </Form>
  );
}

export default Login;
