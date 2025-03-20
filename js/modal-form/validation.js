import { numDecline, getTemplate, isEscapeKey } from '../utils/dom';
import { sendData } from '../api';
import { closeUploadForm } from './upload-form.js';

// Константы для валидации

const HASHTAG_VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_MAX_NUMBER = 5;
const HASHTAG_MAX_SYMBOLS = 20;
const COMMENT_MAX_LENGTH = 140;
//const REMOVE_MESSAGE_TIMEOUT = 5000;

// Текст ошибки

let errorText = '';

const error = () => errorText;

// Текст для кнопки отправить

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

// Элементы управления формы

const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

// Шаблон формы успешной отправки

const successTemplate = getTemplate('#success');

// Шаблон формы ошибки

const errorTemplate = getTemplate('#error');

// Показ окна об успешной отправке формы

const showMessage = (message, shouldCloseForm = false) => {
  const newMessage = message.cloneNode(true);
  const messageButton = newMessage.querySelector('button[type="button"]');

  document.body.append(newMessage);

  const onMessageButtonClick = () => {
    newMessage.remove();
    messageButton.removeEventListener('click', onMessageButtonClick);
    if (shouldCloseForm) {
      closeUploadForm();
    }
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      newMessage.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
      if (shouldCloseForm) {
        closeUploadForm();
      }
    }
  };

  const onOverlayClick = (evt) => {
    if (evt.target === newMessage) {
      newMessage.remove();
      document.removeEventListener('click', onOverlayClick);
      if (shouldCloseForm) {
        closeUploadForm();
      }
    }
  };

  document.addEventListener('keydown', onDocumentKeydown);
  messageButton.addEventListener('click', onMessageButtonClick);
  document.addEventListener('click', onOverlayClick);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

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
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error'
});

const onSendDataSuccess = () => {
  closeUploadForm();
  showMessage(successTemplate, true);
  uploadForm.reset();
};

const onSendDataError = () => {
  showMessage(errorTemplate, false);
  uploadForm.reset();
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


// Добавление валидаторов

pristine.addValidator(commentInput, (value) => value.length <= COMMENT_MAX_LENGTH, `Длина комментария не должна превышать ${COMMENT_MAX_LENGTH} символов`);

pristine.addValidator(hashtagInput, isHashtagsValid, error, false);

// Добавление обработчика события отправки формы

uploadForm.addEventListener('submit', onFormSubmit);

hashtagInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

commentInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

export { pristine };
