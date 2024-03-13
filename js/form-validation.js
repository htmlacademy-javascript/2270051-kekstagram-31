import {isEscapeKey} from './util.js';

const uploadForm = document.querySelector('.img-upload__form'); // форма отправки информации о фотографии на сервер
const uploadInput = document.querySelector('.img-upload__input'); // поле для загрузки фотографии
const uploadOverlay = document.querySelector('.img-upload__overlay'); // модальное окно редактирования фотографии
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const btnCloseUploadForm = uploadForm.querySelector('.img-upload__cancel'); // крестик закрытия на большом изображении
const regex = /^#[a-zа-яё0-9]{1,19}$/i;

// обработчик нажатия клавиши Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    // проверяем, находится ли фокус в поле ввода хэштега или комментария
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      return; // если фокус находится в поле ввода хэштега или комментария, то форма не закроется
    }
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeUploadForm();
  }
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateHashtag = (value) => {
  if (!value) {
    return true; // проверка на пустое значение
  }
  const hashtags = value.trim().split(' ');

  // удаление строк, состоящих только из пробелов
  const hashtagsFiltered = hashtags.filter((hashtag) => hashtag.trim() !== '');

  // проверка на максимальное количество хэштегов
  if (hashtagsFiltered.length > 5) {
    return false;
  }

  // проверка на повторяющиеся хэштеги
  const uniqueHashtags = new Set(hashtagsFiltered);
  if (hashtagsFiltered.length !== uniqueHashtags.size) {
    return false;
  }

  // проверка на правильный формат хэштега
  for (const hashtag of hashtagsFiltered) {
    if (!regex.test(hashtag)) {
      return false;
    }
  }
  return true;
};

pristine.addValidator(
  hashtagInput,
  validateHashtag,
  `Хэш-тег должен начинаться с символа #. <br>
  Хеш-тег не может состоять только из одной решётки. <br>
  Строка после решётки должна состоять из букв и чисел. <br>
  Максимальная длина хэш-тега 20 символов. <br>
  Хэш-теги не должны повторяться. <br>
  Нельзя указать больше пяти хэш-тегов.`
);

pristine.addValidator(
  commentInput,
  (value) => value.length <= 140,
  'Комментарий не может содержать более 140 символов.'
);

// функция открывает форму загрузки
const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown); // закрывает окно по нажатию клавиши Esc
};

// функция закрывает форму загрузки
const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  uploadInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown); // удаляем обработчик нажатия клавиши Esc
  pristine.reset(); // очищаем ошибки и состояние валидации
};

uploadInput.addEventListener('change', () => {
  openUploadForm();
});

// закрывает форму загрузки по нажатию на крестик
btnCloseUploadForm.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploadForm();
});
