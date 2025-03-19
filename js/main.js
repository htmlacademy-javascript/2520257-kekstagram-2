import { renderBigPicture } from './pictures/big-pictures.js';
import { renderFilters } from './pictures/sort-pictures.js';
import { showErrorMessage } from './modal-form/validation.js';
import { getData } from './api.js';
import './modal-form/upload-picture.js';
import './modal-form/slider-effects.js';
import './modal-form/upload-form.js';
import './modal-form/scale-control.js';
import './modal-form/validation.js';


// Полчение изображений с сервера

const loadDataFromServer = () => {
  getData()
    .then((photos) => {
      renderFilters(photos);
      renderBigPicture(photos);
    })
    .catch((error) => {
      showErrorMessage(error.message);
    });
};

loadDataFromServer();


