import { numDecline } from '../utils/dom';
const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const HASHTAG_VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const HASHTAG_MAX_NUMBER = 5;

const COMMENT_MAX_LENGTH = 140;

let errorText = '';

const error = () => errorText;

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
      check: inputArray.some((item) => item.length > HASHTAG_MAX_NUMBER),
      error: 'Хештег не может быть больше 20 символов',
    },
    {
      check: inputArray.length > COMMENT_MAX_LENGTH,
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

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form', // Элемент, на который будут добавляться классы
  errorTextParent: 'img-upload__field-wrapper', // Элемент, куда будет выводиться текст с ошибкой
  errorTextClass: 'img-upload__field-wrapper--error' // Класс для элемента с текстом ошибки
}); //если не хотите, чтобы Pristine валидировала форму по мере ввода, то передайте при подключении третьим аргументом false.

pristine.addValidator(commentInput, (value) => value.length <= COMMENT_MAX_LENGTH, `Длина комментария не должна превышать ${COMMENT_MAX_LENGTH} символов`);
pristine.addValidator(hashtagInput, isHashtagsValid, error, false);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
