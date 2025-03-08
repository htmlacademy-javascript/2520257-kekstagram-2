import { isEscapeKey } from '../utils/dom.js';
import { renderThumbnails, picturesList } from './thumbnails.js';
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
  picturesList.addEventListener('click', (evt) => {
    const currentThumbnail = evt.target.closest('[data-photo-id]');

    if (currentThumbnail) {
      currentPhoto = renderThumbnails.find((photo) => photo.id === currentThumbnail.dataset.photoId);
      renderComments(currentPhoto);
      openBigPicture();
    }
  });
};

export { renderBigPicture };
