import { useState, useCallback } from 'react';

function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  function handleChange(e) {
    const { name, value, validationMessage } = e.target;

    setErrors((previousErrors) => ({ ...previousErrors, [name]: validationMessage || '' }));
    setValues((previousValues) => ({ ...previousValues, [name]: value || '' }));

    setIsFormValid(e.target.closest('form').checkValidity());
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsFormValid(false);
  }, []);

  return {
    values, errors, isFormValid, handleChange, resetForm, setValues,
  };
}

export default useFormWithValidation;
