import { getData } from './fetch-api.js';
// получаем секцию для вставки фотографий
const pictures = document.querySelector('.pictures');

// получаем шаблон секции для вставки фотографий
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// вызываем функцию генерации фотографий
let photos;
// создаем фрагмент, в который сначала будем записывать фотографии
const photosFragment = document.createDocumentFragment();

getData()
  .then((jsonData) => {
    photos = jsonData;
    // пробегаем циклом по каждой фотографии и добавляем нужные данные
    photos.forEach((photo) => {
      const pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = photo.url;
      pictureElement.querySelector('.picture__img').alt = photo.description;
      pictureElement.querySelector('.picture__likes').textContent = photo.likes;
      pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
      // складываем фотографии во фрагмент
      photosFragment.append(pictureElement);
    });

    // из фрагмента отрисовываем фотографии на страницу
    pictures.append(photosFragment);

    // после завершения загрузки изображений с сервера показываем блок с фильтрами
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  });

export { pictures, photos };
