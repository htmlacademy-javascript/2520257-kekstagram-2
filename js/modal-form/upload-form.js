import { isEscapeKey, getTemplate } from '../utils/dom.js';
import { resetEffects } from './slider-effects';
import { resetScale } from './scale-control.js';
import { pristine } from './validation.js';
import { sendData } from '../api';

// Текст для кнопки отправить

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

// Элементы формы

const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadResetButton = uploadForm.querySelector('.img-upload__cancel');
const submitButton = uploadForm.querySelector('.img-upload__submit');

// Шаблон формы успешной отправки

const successTemplate = getTemplate('#success');

// Шаблон формы ошибки

const errorTemplate = getTemplate('#error');

// Показ окна об успешной отправке формы

const showMessage = (message) => {
  const newMessage = message.cloneNode(true);
  const messageButton = newMessage.querySelector('button[type="button"]');

  document.body.append(newMessage);

  const onMessageButtonClick = () => {
    newMessage.remove();
    messageButton.removeEventListener('click', onMessageButtonClick);
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      newMessage.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };

  const onOverlayClick = (evt) => {
    if (evt.target === newMessage) {
      newMessage.remove();
      document.removeEventListener('click', onOverlayClick);
    }
  };

  document.addEventListener('keydown', onDocumentKeydown);
  messageButton.addEventListener('click', onMessageButtonClick);
  document.addEventListener('click', onOverlayClick);
};

// Блокирует кнопку отправки формы
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

// Разблокирует кнопку отправки формы

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Обработчик события нажатия клавиши Esc

const onUploadFormKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    const errorMessage = document.querySelector('.error');
    if (errorMessage) {
      evt.preventDefault();
      errorMessage.remove();
    } else {
      evt.preventDefault();
      evt.stopPropagation();
      closeUploadForm();
    }
  }
};

// Обработчик клика по кнопке закрытия формы

const onUploadFormCancelClick = () => {
  closeUploadForm ();
};

// Закрывает форму загрузки изображения

function closeUploadForm () {
  resetEffects();
  resetScale();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadFormKeydown);
  uploadResetButton.removeEventListener('click', onUploadFormCancelClick);
  uploadForm.reset();
}

// Открывает форму загрузки изображения

const openUploadForm = () => {
  uploadButton.addEventListener('change', () => {
    pristine.reset();
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onUploadFormKeydown);
    uploadResetButton.addEventListener('click', onUploadFormCancelClick);
  });
};

// Валидация отправки формы

const onSendDataSuccess = () => {
  closeUploadForm();
  showMessage(successTemplate);
  uploadForm.reset();
};

const onSendDataError = () => {
  showMessage(errorTemplate);
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(onSendDataSuccess)
      .catch(onSendDataError)
      .finally(unblockSubmitButton);
  }
};

// Добавление обработчика события отправки формы

uploadForm.addEventListener('submit', onUploadFormSubmit);

openUploadForm();

