import { useState } from 'react';
import { ERROR_TEXTS, MESSAGE_TEXTS } from '../utils/constants';

function useErrorsMessages() {
  const [errorText, setErrorText] = useState('');
  const [messageText, setMessageText] = useState('');

  function handleError(err, type) {
    console.log(err.message);
    const { code } = err;
    const obj = ERROR_TEXTS;

    if (obj[code]) {
      if (obj[code] && obj[code][type]) {
        setErrorText(obj[code][type]);
        return;
      }
      setErrorText(obj[code].default);
      return;
    }

    setMessageText(obj.default.default);
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
