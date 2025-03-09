import { isEscapeKey } from '../utils/dom.js';
import { thumbnailsData, picturesListTemplate } from './thumbnails.js';
import { renderComments } from './render-comments.js';

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

const renderBigPicture = () => {
  picturesListTemplate.addEventListener('click', (evt) => {
    const currentThumbnail = evt.target.closest('[data-photo-id]');

    if (currentThumbnail) {
      currentPhoto = thumbnailsData.find((photo) => photo.id === Number(currentThumbnail.dataset.photoId));
      renderComments(currentPhoto);
      openBigPicture();
    }
  });
};

export { renderBigPicture };
