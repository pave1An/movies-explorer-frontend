import { useState, useCallback, useEffect } from 'react';
import { isEmail } from 'validator';
import { NAME_REGEXP } from '../utils/constants';

function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAllFieldsValid, setIsAllFieldsValid] = useState(false);

  function setErrorText(boolean, inputName, errorText) {
    const errorMessage = boolean ? '' : errorText;
    setErrors((previousErrors) => ({ ...previousErrors, [inputName]: errorMessage }));
  }

  function handleChange(e) {
    const {
      name, value, validationMessage,
    } = e.target;

    setErrors((previousErrors) => ({ ...previousErrors, [name]: validationMessage || '' }));
    setValues((previousValues) => ({ ...previousValues, [name]: value || '' }));

    if (name === 'email' && !validationMessage) {
      setIsEmailValid(isEmail(value));
      setErrorText(isEmail(value), 'email', 'Пожалуйста, введите корректный E-mail');
    }

    if (name === 'name' && !validationMessage) {
      setIsNameValid(NAME_REGEXP.test(value));
      setErrorText(NAME_REGEXP.test(value), 'name', 'Пожалуйста, введите корректное имя (разрешены буквы русского и латинского алфавита, дефис, пробел)');
    }

    setIsFormValid(e.target.closest('form').checkValidity());
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsFormValid(false);
  }, [setValues, setErrors, setIsFormValid]);

  useEffect(() => {
    setIsAllFieldsValid(isFormValid && isEmailValid && isNameValid);
  }, [isFormValid, isEmailValid, isNameValid]);

  return {
    values, errors, isFormValid, isAllFieldsValid, handleChange, resetForm, setValues,
  };
}

export default useFormWithValidation;
