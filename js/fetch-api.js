import {isEscapeKey} from './util.js';

const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

// функция для отображения сообщения об ошибке при загрузке данных с сервера
const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorElement = errorTemplate.cloneNode(true);
  document.body.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

// асинхронная функция для получения данных с сервера
const getData = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/data`);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    showErrorMessage();
    throw error;
  }
};

// функция для показа сообщения об ошибке при отправке данных на сервер
const showErrorSentMessage = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  const errorButton = errorElement.querySelector('.error__button');

  // обработчик клика по кнопке "Попробовать ещё раз"
  errorButton.addEventListener('click', () => {
    errorElement.remove();
  });

  // обработчик нажатия клавиши Esc
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt) && errorElement.parentNode) {
      evt.preventDefault();
      errorElement.remove();
    }
  });

  // обработчик клика по произвольной области экрана
  document.addEventListener('click', (evt) => {
    if (!errorElement.contains(evt.target) && errorElement.parentNode) {
      errorElement.remove();
    }
  });

  document.body.appendChild(errorElement);
};

// функция для показа сообщения об успешной отправке данных на сервер
const showSuccessSentMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  const successButton = successElement.querySelector('.success__button');

  // обработчик клика по кнопке "Круто!"
  successButton.addEventListener('click', () => {
    successElement.remove();
  });

  // обработчик нажатия клавиши Esc
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt) && successElement.parentNode) {
      evt.preventDefault();
      successElement.remove();
    }
  });

  // обработчик клика по произвольной области экрана
  document.addEventListener('click', (evt) => {
    if (!successElement.contains(evt.target) && successElement.parentNode) {
      successElement.remove();
    }
  });

  document.body.appendChild(successElement);
};

// асинхронная функция для загрузки данных на сервер
const sendData = async (formElement) => {
  const formData = new FormData(formElement);
  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Ошибка отправки: ${response.status} ${response.statusText}`);
    }
    showSuccessSentMessage();
    return await response.json();
  } catch (error) {
    showErrorSentMessage();
    throw new Error(`Ошибка отправки данных: ${error.message}`);
  }
};

export { getData, sendData };
