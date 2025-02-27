import { getPhotos } from './data.js';
import { getTemplate } from './utils/dom.js';

const picturesList = document.querySelector('.pictures');
const picturesListTemplate = getTemplate('#picture');
const generatePictures = getPhotos();
const picturesListFragment = document.createDocumentFragment();

// без деструктуризации временно для осознания
// generatePictures.forEach((picture) => {
//   const newPicture = picturesListTemplate.cloneNode(true);
//   newPicture.querySelector('.picture__img').src = picture.url;
//   newPicture.querySelector('.picture__img').alt = picture.description;
//   newPicture.querySelector('.picture__comments').src = picture.comments;
//   newPicture.querySelector('.picture__likes').src = picture.likes;
//   picturesListFragment.appendChild(newPicture);
// });

generatePictures.forEach(({url, description, likes, comments}) => {
  const newPicture = picturesListTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = url;
  newPicture.querySelector('.picture__img').alt = description;
  newPicture.querySelector('.picture__comments').textContent = comments.length;
  newPicture.querySelector('.picture__likes').textContent = likes;
  picturesListFragment.appendChild(newPicture);
});

picturesList.appendChild(picturesListFragment);

// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Описание изображения description подставьте в атрибут alt изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.
