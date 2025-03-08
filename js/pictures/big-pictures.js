import { isEscapeKey } from '../utils/dom.js';
import { picturesList } from './thumbnails.js';
import { renderComments } from './render-comments.js';
import { photos } from '../data';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onBigPictureClick = () => {
  closeBigPicture();
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.addEventListener('click', onBigPictureClick, {once: true});
};

let currentPhoto;

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

const renderBigPicture = (photoData) => {
  picturesList.addEventListener('click', (evt) => {
    const currentThumbnail = evt.target.closest('[data-photo-id]');
    renderComments(currentThumbnail);

    if (currentThumbnail) {
      currentPhoto = photos.find((photo) => photo.id === Number(photoData));
      renderComments(currentPhoto);
      openBigPicture();
    }
  });
};

export { renderBigPicture };
