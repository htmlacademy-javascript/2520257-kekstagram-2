import { getPhotos } from '../data.js';
import { getTemplate } from '../utils/dom.js';

const picturesList = document.querySelector('.pictures');
const picturesListTemplate = getTemplate('#picture');
const thumbnailsData = getPhotos();
const picturesListFragment = document.createDocumentFragment();

// без деструктуризации временно для осознания
// generatePictures.forEach((picture) => {
//   const newPicture = picturesListTemplate.cloneNode(true);
//   newPicture.querySelector('.picture__img').src = picture.url;

// thumbnailsData.forEach(({id, url, description, likes, comments}) => {
//   const newPicture = picturesListTemplate.cloneNode(true);
//   newPicture.querySelector('.picture__img').src = url;
//   newPicture.querySelector('.picture__img').alt = description;

thumbnailsData.forEach(({id, url, description, likes, comments}) => {
  const newPicture = picturesListTemplate.cloneNode(true);

  newPicture.querySelector('.picture__img').src = url;
  newPicture.querySelector('.picture__img').alt = description;
  newPicture.setAttribute('data-photo-id', id);
  newPicture.querySelector('.picture__comments').textContent = comments.length;
  newPicture.querySelector('.picture__likes').textContent = likes;
  picturesListFragment.appendChild(newPicture);
});

// const renderThumbnails = (photos) => {
//   const picturesListFragment = document.createDocumentFragment();

//   photos.forEach((photo) => {
//     picturesListFragment.appendChild(thumbnailsData(photo));
//   });

//   picturesList.appendChild(picturesListFragment);

// };

picturesList.appendChild(picturesListFragment);

export { picturesList, thumbnailsData };
