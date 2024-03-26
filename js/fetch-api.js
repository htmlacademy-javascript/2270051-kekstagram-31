const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';

// асинхронная функция для получения данных с сервера
const getData = async () => {
  try {
    const response = await fetch(SERVER_URL);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
    showErrorMessage();
    throw error;
  }
};

// функция для отображения сообщения об ошибке
const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorElement = errorTemplate.cloneNode(true);
  document.body.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

const sendData = async (data) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: data,
    });
    if (!response.ok) {
      throw new Error(`Ошибка отправки: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Ошибка отправки данных: ${error.message}`);
  }
};

export { getData, sendData };
