class CustomError extends Error {
  constructor(message = 'uncnown error', statusCode = 'uncnown code') {
    super(message);
    this.message = `Ошибка: ${message}, код ошибки: ${statusCode}`;
    this.code = statusCode;
  }
}

export default CustomError;
