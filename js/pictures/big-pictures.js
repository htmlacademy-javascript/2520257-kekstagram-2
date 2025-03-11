import { isEscapeKey } from '../utils/dom.js';
import { thumbnailsData, picturesList } from './thumbnails.js';
import { showComments } from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');

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

//let currentPhoto;

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const renderBigPicture = () => {
  picturesList.addEventListener('click', (evt) => {
    const currentThumbnail = evt.target.closest('[data-photo-id]');

    if (currentThumbnail) {
      const currentPhoto = thumbnailsData.find((photo) => photo.id === Number(currentThumbnail.dataset.photoId));

      bigPictureImg.src = currentPhoto.url;
      bigPictureLikes.textContent = currentPhoto.likes;
      socialCaption.textContent = currentPhoto.description;

      showComments(currentPhoto.comments);

      openBigPicture();
    }
  });
};

export { renderBigPicture };
