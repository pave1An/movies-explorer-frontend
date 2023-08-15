import { useState, useCallback } from 'react';
import { isEmail } from 'validator';
import { nameRegExp } from '../utils/constants';

function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsValid] = useState(false);

  function handleChange(e) {
    const {
      name, value, validationMessage,
    } = e.target;
    setErrors((previousErrors) => ({ ...previousErrors, [name]: validationMessage || '' }));
    setValues((previousValues) => ({ ...previousValues, [name]: value }));
    setTimeout(() => console.log(errors.name, 1), 3000);

    if (
      name === 'email'
      && !isEmail(value)
      && errors.email === ''
    ) {
      setErrors((previousErrors) => ({ ...previousErrors, email: 'Некорректный email' }));
    }

    if (
      name === 'name'
      && !nameRegExp.test(value)
      && errors.name === ''
    ) {
      setErrors((previousErrors) => ({ ...previousErrors, name: 'Некорректное имя' }));
    }

    setIsValid(e.target.closest('form').checkValidity() && isEmail(value));
    console.log(errors.name);
  }

  const resetForm = useCallback(() => {
    setValues({});
    setErrors({});
    setIsValid(false);
  }, [setValues, setErrors, setIsValid]);

  return {
    values, errors, isFormValid, handleChange, resetForm, setValues,
  };
}

export default useFormWithValidation;
