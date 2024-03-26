import { isEscapeKey } from './util.js';

const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

// общая функция для создания и показа сообщения
const showMessage = (templateId, closeButtonSelector) => {
  const template = document.querySelector(templateId).content.querySelector(`.${templateId.slice(1)}`);
  const element = template.cloneNode(true);
  const closeButton = element.querySelector(closeButtonSelector);

  // обработчик клика по произвольной области экрана или нажатия клавиши Esc
  const clickHandler = (evt) => {
    if (evt.type === 'click' || (evt.type === 'keydown' && isEscapeKey(evt))) {
      element.remove();
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('keydown', clickHandler);
    }
  };

  // обработчик клика по кнопке закрытия
  if (closeButton) {
    closeButton.addEventListener('click', (evt) => {
      evt.stopPropagation();
      element.remove();
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('keydown', clickHandler);
    });
  }

  // добавляем обработчик событий клика и нажатия клавиши Esc
  document.addEventListener('click', clickHandler);
  document.addEventListener('keydown', clickHandler);

  // добавляем сообщение в конец body
  document.body.appendChild(element);
};

// функция для показа сообщения об ошибке при загрузке данных с сервера
const showErrorMessage = () => {
  showMessage('#data-error', null);
  // удаление сообщения через 5 секунд
  setTimeout(() => {
    const errorElement = document.querySelector('.data-error');
    if (errorElement) {
      errorElement.remove();
    }
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
  showMessage('#error', '.error__button');
};

// функция для показа сообщения об успешной отправке данных на сервер
const showSuccessSentMessage = () => {
  showMessage('#success', '.success__button');
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
    formElement.reset();
    return await response.json();
  } catch (error) {
    showErrorSentMessage();
    throw new Error(`Ошибка отправки данных: ${error.message}`);
  }
};

export { getData, sendData };
