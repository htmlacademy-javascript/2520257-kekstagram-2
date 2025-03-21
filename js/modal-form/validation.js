import { numDecline, isEscapeKey } from '../utils/dom';

// Константы для валидации

const HASHTAG_VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_MAX_NUMBER = 5;
const HASHTAG_MAX_SYMBOLS = 20;
const COMMENT_MAX_LENGTH = 140;

// Текст ошибки

let errorText = '';

const getErrorText = () => errorText;

// Элементы управления формы

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');


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

// Добавление валидаторов

pristine.addValidator(commentInput, (value) => value.length <= COMMENT_MAX_LENGTH, `Длина комментария не должна превышать ${COMMENT_MAX_LENGTH} символов`);

pristine.addValidator(hashtagInput, isHashtagsValid, getErrorText, false);

// Обработчики для предотвращения закрытия формы при нажатии Escape

const onHashtagInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onCommentInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};


hashtagInput.addEventListener('keydown', onHashtagInputKeydown);
commentInput.addEventListener('keydown', onCommentInputKeydown);

export { pristine };
