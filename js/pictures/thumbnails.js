import { getTemplate } from '../utils/dom.js';

// Элементы миниатюр

const picturesList = document.querySelector('.pictures');
const picturesListTemplate = getTemplate('#picture');

// Создаем миниатюры

const createThumbnails = ({id, url, description, likes, comments}) => {
  const newPicture = picturesListTemplate.cloneNode(true);

  newPicture.querySelector('.picture__img').src = url;
  newPicture.querySelector('.picture__img').alt = description;
  newPicture.dataset.photoId = id;
  newPicture.querySelector('.picture__comments').textContent = comments.length;
  newPicture.querySelector('.picture__likes').textContent = likes;
  return newPicture;
};

// Рендер миниатюр

const renderThumbnails = (photos) => {
  const currentThumbnails = picturesList.querySelectorAll('.picture');

  currentThumbnails.forEach((thumbnail) => thumbnail.remove());

  const picturesListFragment = document.createDocumentFragment();

  photos.forEach((thumbnail) => {
    picturesListFragment.appendChild(createThumbnails(thumbnail));
  });

  picturesList.appendChild(picturesListFragment);
};

export { renderThumbnails };
