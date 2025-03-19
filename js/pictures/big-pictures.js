import { isEscapeKey } from '../utils/dom.js';
import { showComments, clearComments } from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const picturesList = document.querySelector('.pictures');

// Обработчики

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onBigPictureClick = () => {
  closeBigPicture();
};

// Открытия окна полноразмерной картинки

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.addEventListener('click', onBigPictureClick, {once: true});
};

// Ищем картинку среди миниатюр

const renderBigPicture = (photos) => {
  picturesList.addEventListener('click', (evt) => {
    const currentThumbnail = evt.target.closest('[data-photo-id]');

    if (currentThumbnail) {

      const photoId = Number(currentThumbnail.dataset.photoId);
      const currentPhoto = photos.find((photo) => photo.id === photoId);

      if (currentPhoto) {
        bigPictureImg.src = currentPhoto.url;
        bigPictureImg.alt = currentPhoto.description;
        bigPictureLikes.textContent = currentPhoto.likes;
        socialCaption.textContent = currentPhoto.description;

        showComments(currentPhoto.comments);

        openBigPicture();
      }
    }
  });
};

// Функция закрытия окна

function closeBigPicture () {
  clearComments();
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

export { renderBigPicture };
