import { numDecline, getTemplate, isEscapeKey } from '../utils/dom';
import { sendData } from '../api';
import { closeUploadForm } from './upload-form.js';

const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

// Шаблон формы успешной отправки

const successTemplate = getTemplate('#success');

// Шаблон формы ошибки

const errorTemplate = getTemplate('#data-error');

// Константы для валидации

const HASHTAG_VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_MAX_NUMBER = 5;
const HASHTAG_MAX_SYMBOLS = 20;
const COMMENT_MAX_LENGTH = 140;
const REMOVE_MESSAGE_TIMEOUT = 5000;

let errorText = '';

const error = () => errorText;

// Показ окна об успешной отправке формы

const showSuccessMessage = () => {
  const successModal = successTemplate.cloneNode(true);
  const successButton = successModal.querySelector('.success__button');

  document.body.append(successModal);

  const onSuccessButtonClick = () => {
    successModal.remove();
    successButton.removeEventListener('click', onSuccessButtonClick);
    closeUploadForm();
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successModal.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
      closeUploadForm();
    }
  };

  const onSuccessOverlayClick = (evt) => {
    if (evt.target === successModal) {
      successModal.remove();
      document.removeEventListener('click', onSuccessOverlayClick);
      closeUploadForm();
    }
  };

  document.addEventListener('keydown', onDocumentKeydown);
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('click', onSuccessOverlayClick);
};

// Показ окна об ошибке с задержкой 5 секунд

const showErrorMessage = (errorMessageText) => {
  const errorModal = errorTemplate.cloneNode(true);

  const errorMessage = errorModal.querySelector('.data-error__title');
  if (errorMessage) {
    errorMessage.textContent = errorMessageText;
  }

  document.body.append(errorModal);

  setTimeout(() => {
    errorModal.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

// Текст для кнопки отправить

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// const uodateText = debounce(() => {
//   const filteredImages = applyFilter(pictures, currentFilter);
//   renderThumbnails(filteredImages);
// }, RERENDER_DELAY);


// Проверка хэштега на валидность

const isHashtagsValid = (value) => {
  errorText = '';
  const inputText = value.toLowerCase().trim();
  if (inputText.length === 0) {
    return true;
  }
  const inputArray = inputText.split(/\s+/);
  const errors = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хештег не может состоять только из одной решетки',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа \'#\'',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > HASHTAG_MAX_SYMBOLS),
      error: `Хештег не может быть больше ${HASHTAG_MAX_SYMBOLS} символов, включая символ решётки`,
    },
    {
      check: inputArray.length > HASHTAG_MAX_NUMBER,
      error: `Нельзя указать больше ${HASHTAG_MAX_NUMBER} ${numDecline(
        HASHTAG_MAX_NUMBER, 'хештега', 'хештегов', 'хештегов'
      )}, `
    },
    {
      check: inputArray.some((item) => !HASHTAG_VALID_SYMBOLS.test(item)),
      error: 'Хэштег содержит недопустимые символы',
    },
  ];

  return errors.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorText = rule.error;
    }
    return !isInvalid;
  });
};

// Валидация формы

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const onSendDataSuccess = () => {
  closeUploadForm();
  showSuccessMessage();
  uploadForm.reset();
};

const onSendDataError = () => {
  showErrorMessage('Не удалось загрузить фотографию. Попробуйте еще раз.');
};

const onFormSubmit = (evt) => {
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

pristine.addValidator(commentInput, (value) => value.length <= COMMENT_MAX_LENGTH, `Длина комментария не должна превышать ${COMMENT_MAX_LENGTH} символов`);

pristine.addValidator(hashtagInput, isHashtagsValid, error, false);

uploadForm.addEventListener('submit', onFormSubmit);

hashtagInput.addEventListener('input', (evt) => {
  validateHashtags(evt.target.value);
});

commentInput.addEventListener('input', (evt) => {
  validateComments(evt.target.value);
});

export { showErrorMessage };
