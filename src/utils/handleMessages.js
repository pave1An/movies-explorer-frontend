import { useState } from 'react';
import { MESSAGE_TEXTS } from './constants';

function useErrorsWithMessges() {
  const [errorMessage, setErrorMessage] = useState('');

  function handleError(name, err) {
    const errCode = err.message.match(/\d+/);
    setErrorMessage(MESSAGE_TEXTS[name][errCode[0]]);
    console.log(err);
  }

  function deleteMessage() {
    if (errorMessage) setErrorMessage('');
  }
  // if (err) message = MESSAGE_TEXTS[err.code];
  // message = MESSAGE_TEXTS[name];
  return { handleError, errorMessage, deleteMessage };
}

export default useErrorsWithMessges;
