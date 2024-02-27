import {getRandomNumber, getRandomElement} from './util.js';

const PHOTO_DESCRIPTIONS = [
  'Солнечный день на пляже',
  'Горный пейзаж за окном',
  'Тихая уличная улочка',
  'Пейзаж закатных волн на берегу',
  'Цветы в тени солнца',
  'Летний лес в тумане',
  'Закат на фоне горного массива',
  'Песчаный пляж с горами вдали',
  'Снежные вершины в снегу',
  'Летний лес в солнечных лучах'
];

const COMMENTS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENTS_NAMES = [
  'Алексей',
  'Алла',
  'Валентина',
  'Василий',
  'Галина',
  'Дарья',
  'Дмитрий',
  'Евгений',
  'Екатерина',
  'Иван',
  'Ирина'
];

const PHOTO_DESCRIPTION_COUNT = 25;

// функция, которая инициализирует новую группу Id
const initId = () => {
  let id = 0;
  // функция получения уникального Id
  return function () {
    id++;
    return id;
  };
}

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

export {createPhotos};
