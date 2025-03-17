import { renderBigPicture } from './pictures/big-pictures.js';
import { renderThumbnails } from './pictures/thumbnails.js';
import { showErrorMessage } from './modal-form/validation.js';
import { getData } from './api.js';
import './modal-form/slider-effects.js';
import './modal-form/upload-form.js';
import './modal-form/scale-control.js';
import './modal-form/validation.js';

// Полчение изображений с сервера

const loadDataFromServer = () => {
  getData()
    .then((photos) => {
      renderThumbnails(photos);
      renderBigPicture(photos);
    })
    .catch((error) => {
      showErrorMessage(error.message);
    });
};

loadDataFromServer();


