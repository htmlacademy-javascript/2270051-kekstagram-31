import {isEscapeKey} from "./util.js";

const log = console.log;

const uploadForm = document.querySelector('.img-upload__form'); // форма отправки информации о фотографии на сервер
const uploadInput = document.querySelector('.img-upload__input'); // поле для загрузки фотографии
const uploadOverlay = document.querySelector('.img-upload__overlay'); // модальное окно редактирования фотографии
const uploadSubmit = document.querySelector('.img-upload__submit'); // кнопка для отправки данных на сервер

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
    closeUploadForm();
  }
};

const getHashtagFiltered = () => {
  const hashtags = hashtagInput.value.trim().split(' ');

  // удаление строк, состоящих только из пробелов
  const hashtagsFiltered = hashtags.filter(hashtag => hashtag.trim() !== '');
  return hashtagsFiltered;
}

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  // successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateHashtag1 = (value) => {
  // проверка на пустое значение
  if (!value) return true;
}

const validateHashtag2 = (value) => {
const hashtagsFiltered = getHashtagFiltered();
  // проверка на максимальное количество хэштегов
  if (hashtagsFiltered.length > 5) return false;
}

const validateHashtag3 = (value) => {
  // проверка на повторяющиеся хэштеги
  const uniqueHashtags = new Set(hashtagsFiltered);
  if (hashtagsFiltered.length !== uniqueHashtags.size) return false;
}

const validateHashtag4 = (value) => {
  // проверка на правильный формат хэштега
  for (const hashtag of hashtagsFiltered) {
    if (!regex.test(hashtag)) {
      if (!hashtag.startsWith('#')) return false;
    }
  }
}

const validateHashtag5 = (value) => {
  for (const hashtag of hashtagsFiltered) {
    if (!regex.test(hashtag)) {
      if (hashtag.length === 1) return false;
    }
  }
}

const validateHashtag6 = (value) => {
  for (const hashtag of hashtagsFiltered) {
    if (!regex.test(hashtag)) {
      if (hashtag.length > 20) return false;
    }
  }
}

const validateComment = (value) => {
  return value.length <= 140;
}

pristine.addValidator(
  hashtagInput,
  validateHashtag1,
  ''
);

pristine.addValidator(
  hashtagInput,
  validateHashtag2,
  'Нельзя указать больше пяти хэш-тегов'
);

pristine.addValidator(
  hashtagInput,
  validateHashtag3,
  'Хэш-теги не должны повторяться'
);

pristine.addValidator(
  hashtagInput,
  validateHashtag4,
  'Хэш-тег должен начинаться с символа #'
);

pristine.addValidator(
  hashtagInput,
  validateHashtag5,
  'Хеш-тег не может состоять только из одной решётки'
);

pristine.addValidator(
  hashtagInput,
  validateHashtag6,
  'Максимальная длина хэш-тега 20 символов'
);

pristine.addValidator(
  commentInput,
  validateComment,
  'Комментарий не может содержать более 140 символов.'
);

// функция открывает форму загрузки
const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown); // закрывает окно по нажатию клавиши Esc
}

// функция закрывает форму загрузки
const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  uploadInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown); // удаляем обработчик нажатия клавиши Esc
};

uploadInput.addEventListener('change', (evt) => {
  openUploadForm();
})

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
})

// закрывает форму загрузки по нажатию на крестик
btnCloseUploadForm.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploadForm();
});
