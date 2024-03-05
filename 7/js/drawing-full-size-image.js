import { pictures, photos } from './drawing-thumbnails.js';
import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture'); // секция полноэкранного показа изображения
const bigPictureImg = bigPicture.querySelector('.big-picture__img img'); // большое изображение
const bigPictureLikesCount = bigPicture.querySelector('.likes-count'); // количество лайков на большом изображении
const bigPictureCaption = bigPicture.querySelector('.social__caption'); // подпись на большом изображении
const bigPictureCommentShownCount = bigPicture.querySelector('.social__comment-shown-count'); // количество показанных комментариев на большом изображении
const bigPictureCommentTotalCount = bigPicture.querySelector('.social__comment-total-count'); // количество всех комментариев на большом изображении
const bigPictureComments = bigPicture.querySelector('.social__comments'); // количество всех комментариев на большом изображении
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count'); // блок счётчика комментариев
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader'); // блок загрузки новых комментариев
const btnClosePicture = bigPicture.querySelector('.big-picture__cancel'); // крестик закрытия на большом изображении

// обработчик нажатия клавиши Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// функция открывает большое изображение, создает комментарии и добавляет обработчик нажатия клавиши Esc для закрытия большого изображения
function openBigPicture(photo) {
  bigPicture.classList.remove('hidden');
  bigPictureCommentsCount.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  bigPictureCaption.textContent = photo.description;
  bigPictureLikesCount.textContent = photo.likes;
  bigPictureCommentTotalCount.textContent = photo.comments.length.toString();
  bigPictureCommentShownCount.textContent = (photo.comments.length <= 5 ? photo.comments.length : 5).toString();

  // создаем комментарии
  for (let i = 0; i < photo.comments.length; i++) {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = photo.comments[i].avatar;
    commentAvatar.alt = photo.comments[i].name;
    commentAvatar.width = 35;
    commentAvatar.height = 35;
    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = photo.comments[i].message;
    commentElement.appendChild(commentAvatar);
    commentElement.appendChild(commentText);
    bigPictureComments.appendChild(commentElement);
  }

  // закрывает окно с большой картинкой по нажатию клавиши Esc
  document.addEventListener('keydown', onDocumentKeydown);
}

// функция скрывает большое изображение и очищает комментарии
function closeBigPicture() {
  bigPicture.classList.add('hidden');
  bigPictureComments.textContent = '';
  document.body.classList.remove('modal-open');

  // удаляем обработчик нажатия клавиши Esc
  document.removeEventListener('keydown', onDocumentKeydown);
}

// открывает окно с большой картинкой по нажатию на превью
pictures.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (evt.target.className === 'picture__img') {
    photos.forEach((photo) => {
      if (evt.target.src.endsWith(photo.url)) {
        openBigPicture(photo);
      }
    });
  }
});

// закрывает окно с большой картинкой по нажатию на крестик
btnClosePicture.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeBigPicture();
});
