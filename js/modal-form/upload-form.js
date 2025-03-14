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

//export { uploadOverlay };

//валидация

/* const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error'
}); */

//


// 1.1. Загрузка нового изображения:

//-- выбор файла с изображением для загрузки;
// изменение масштаба изображения;
// применение одного из заранее заготовленных эффектов;
// выбор глубины эффекта с помощью ползунка;
// добавление текстового комментария;
// добавление хэштегов.
// 1.2. Выбор изображения для загрузки осуществляется с помощью стандартного контрола загрузки файла .img-upload__input, который стилизован под букву «О» в логотипе. После выбора изображения (изменения значения поля .img-upload__input), показывается форма редактирования изображения. У элемента .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open.

// После выбора изображения пользователем с помощью стандартного контрола загрузки файла .img-upload__input, нужно подставить его в форму редактирования вместо тестового изображения в блок предварительного просмотра и в превью эффектов.

// 1.3 Закрытие формы редактирования изображения производится либо нажатием на кнопку .img-upload__cancel, либо нажатием клавиши Esc. Элементу .img-upload__overlay возвращается класс hidden. У элемента body удаляется класс modal-open.
