import { isEscapeKey } from '../utils/dom.js';
const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadResetButton = uploadForm.querySelector('.img-upload__cancel');

// закрытие формы

const onUploadFormKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    closeUploadForm();
  }
};

const onUploadFormCancelClick = () => {
  closeUploadForm ();
};

function closeUploadForm () {
  //pristine.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadFormKeydown);
  uploadResetButton.removeEventListener('click', onUploadFormCancelClick);
  //uploadButton.value = '';
}


// Открытие формы загрузки изображения

const openUploadForm = () => {
  uploadButton.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onUploadFormKeydown);
    uploadResetButton.addEventListener('click', onUploadFormCancelClick);
  });
};

openUploadForm();

