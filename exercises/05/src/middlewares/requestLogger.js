// src/middlewares/requestLogger.js
export const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next(); // Importante: pasa el control a la siguiente función
};