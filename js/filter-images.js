import { renderPhotos, photos } from './drawing-thumbnails.js';
import { debounce } from './util.js';

const filtersForm = document.querySelector('.img-filters__form');
const filtersButtons = document.querySelectorAll('.img-filters__button');
const filterDefault = filtersForm.querySelector('#filter-default');
const filterRandom = filtersForm.querySelector('#filter-random');
const filterDiscussed = filtersForm.querySelector('#filter-discussed');

// текущий активный фильтр
let currentActiveFilter = 'default';

// функция для получения случайных фотографий
const getRandomPhotos = (count) => {
  const randomPhotos = [...photos];
  randomPhotos.sort(() => Math.random() - 0.5);
  return randomPhotos.slice(0, count);
};

// функция для получения фотографий, отсортированных по количеству комментариев
const getDiscussedPhotos = () => {
  const discussedPhotos = [...photos];
  discussedPhotos.sort((a, b) => b.comments.length - a.comments.length);
  return discussedPhotos;
};

// функция для обработки фильтрации фотографий
const handleFilterChange = (filterType) => {
  // если нажата активная кнопка фильтра, ничего не делаем
  if (filterType === currentActiveFilter) {
    return;
  }

  // удаляем класс активности у всех кнопок фильтров
  filtersButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  // добавляем класс активности кнопке выбранного фильтра
  document.querySelector(`#filter-${filterType}`).classList.add('img-filters__button--active');

  // обновляем текущий активный фильтр
  currentActiveFilter = filterType;

  // обрабатываем фильтры
  let filteredPhotos;
  switch (filterType) {
    case 'default':
      filteredPhotos = photos;
      break;
    case 'random':
      filteredPhotos = getRandomPhotos(10);
      break;
    case 'discussed':
      filteredPhotos = getDiscussedPhotos();
      break;
  }

  // устраняем дребезг при перерисовке изображений
  debounce(renderPhotos, 500)(filteredPhotos);
};

// обработчики событий для фильтров
filterDefault.addEventListener('click', () => handleFilterChange('default'));
filterRandom.addEventListener('click', () => handleFilterChange('random'));
filterDiscussed.addEventListener('click', () => handleFilterChange('discussed'));
