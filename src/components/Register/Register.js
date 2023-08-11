import Form from '../Form/Form';
import Input from '../Input/Input';

function Register() {
  const isFormValid = true;
  return (
    <Form
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      isFormValid={isFormValid}
      question="Уже зарегистрированы?"
      link="/signin"
      linkText="Войти"
    >
      <fieldset className="form__fieldset">
        <Input name="name" type="text" required="required" labelText="Имя" minLength="2" />
        <Input name="email" type="email" required="required" labelText="E-mail" />
        <Input name="password" type="password" required="required" labelText="Пароль" minLength="3" errorText="Что-то пошло не так..." />
      </fieldset>
    </Form>
  );
}

export default Register;
