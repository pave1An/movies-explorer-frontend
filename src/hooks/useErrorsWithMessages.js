import { useState } from 'react';
import { ERROR_TEXTS, MESSAGE_TEXTS } from '../utils/constants';

function useErrorsMessages() {
  const [errorText, setErrorText] = useState('');
  const [messageText, setMessageText] = useState('');

  function handleError(err, type) {
    const errCode = err.message.match(/\d+/);
    if (!err.message || !errCode) {
      setErrorText(ERROR_TEXTS.default.default);
      return;
    }

    if (!ERROR_TEXTS[errCode[0]][type]) {
      setErrorText(ERROR_TEXTS[errCode[0]].default);
      console.log(err.message);
      return;
    }

    setErrorText(ERROR_TEXTS[errCode[0]][type]);
    console.log(err.message);
  }

  function handleMessage(type, message) {
    setMessageText(MESSAGE_TEXTS[type][message]);
  }

  function deleteMessages() {
    setErrorText('');
    setMessageText('');
  }

  return {
    errorText, messageText, handleError, handleMessage, deleteMessages,
  };
}

export default useErrorsMessages;
