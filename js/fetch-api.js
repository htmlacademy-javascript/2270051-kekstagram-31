const API_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const getData = async () => {
  try {
    const response = await fetch(`${API_URL}/data`);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Ошибка загрузки данных: ${error.message}`);
  }
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
