import {getRandomElement, getRandomNumber} from './util.js';
import {PHOTO_DESCRIPTIONS, COMMENTS_MESSAGES, COMMENTS_NAMES} from './data.js';

const PHOTO_DESCRIPTION_COUNT = 25;

// функция, которая инициализирует новую группу Id
const initId = () => {
  let id = 0;
  // функция получения уникального Id
  return function () {
    id++;
    return id;
  };
};

// создание новых групп Id
const getNextCommentId = initId();
const getNextPhotoId = initId();

// функция, которая будет создавать комментарий к фотографии
const generateComment = () => {
  const id = getNextCommentId();
  const avatar = `img/avatar-${getRandomNumber(1, 6)}.svg`;
  const message = getRandomElement(COMMENTS_MESSAGES);
  const name = getRandomElement(COMMENTS_NAMES);

  return {
    id,
    avatar,
    message,
    name
  };
};

// функция, которая будет создавать объект с описанием фотографии
const generatePhoto = () => {
  const id = getNextPhotoId();
  const url = `photos/${id}.jpg`;
  const description = getRandomElement(PHOTO_DESCRIPTIONS);
  const likes = getRandomNumber(15, 200);
  const comments = Array.from({ length: getRandomNumber(0, 30) }, generateComment);

  return {
    id,
    url,
    description,
    likes,
    comments
  };
};

// создание массива фотографий
const createPhotos = () => Array.from({ length: PHOTO_DESCRIPTION_COUNT }, generatePhoto);

export {createPhotos, generatePhoto};
