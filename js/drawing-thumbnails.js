import { getData } from './fetch-api.js';

// получаем секцию для вставки фотографий, и секцию с фильтрами
const pictures = document.querySelector('.pictures');
const filters = document.querySelector('.img-filters');

// получаем шаблон секции для вставки фотографий
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// вызываем функцию генерации фотографий
let photos;

// функция для создания элемента фотографии
const createPictureElement = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__img').alt = photo.description;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  return pictureElement;
};

// функция для отрисовки фотографий
const renderPhotos = (photosArray) => {
  // очищаем фотографии
  const pictureElements = pictures.querySelectorAll('.picture');
  pictureElements.forEach((picture) => {
    pictures.removeChild(picture);
  });

  // создаем фрагмент, в который сначала будем записывать фотографии
  const photosFragment = document.createDocumentFragment();

  // отрисовываем отфильтрованные фотографии
  photosArray.forEach((photo) => {
    const pictureElement = createPictureElement(photo);
    photosFragment.appendChild(pictureElement);
  });

  // добавляем фрагмент с фотографиями в контейнер
  pictures.appendChild(photosFragment);
};

getData()
  .then((jsonData) => {
    photos = jsonData;
    // отрисовываем фотографии
    renderPhotos(photos);

    // показываем блок с фильтрами после загрузки фотографий
    filters.classList.remove('img-filters--inactive');
  });

export { pictures, photos, renderPhotos };
