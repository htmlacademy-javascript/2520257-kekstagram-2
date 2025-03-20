import { debounce } from '../utils/dom';
import { renderThumbnails } from './thumbnails';

// Константы

const RERENDER_DELAY = 500;
const RANDOM_IMAGES_NUMBER = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

// Массив миниатюр

let pictures = [];
let currentFilter = Filter.DEFAULT;

const imageFilters = document.querySelector('.img-filters');
const filterButtons = imageFilters.querySelectorAll('.img-filters__button');

// Функция сортировки по умолчанию

const sortDefault = (images) => images.slice();

// Функция сортировки случайных изображений

const sortRandom = (images) => {
  const shuffledImages = images.slice().sort(() => 0.5 - Math.random()).slice(0, RANDOM_IMAGES_NUMBER);

  return shuffledImages.sort((a, b) => a.id - b.id);
};

// Функция сортировки по кол-ву комменатриев

const sortDiscussed = (images) => images.slice().sort((a, b) => b.comments.length - a.comments.length);

// Функция для изменения сортировки

const applyFilter = (images, filter) => {
  switch (filter) {
    case Filter.RANDOM:
      return sortRandom(images);
    case Filter.DISCUSSED:
      return sortDiscussed(images);
    default:
      return sortDefault(images);
  }
};

// Функция для обновления отображения изображений

const updateImages = debounce(() => {
  const filteredImages = applyFilter(pictures, currentFilter);
  renderThumbnails(filteredImages);
}, RERENDER_DELAY);

// Обработчик изменения фильтра

const onFilterChange = (evt) => {
  const selectedButton = evt.target;
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  selectedButton.classList.add('img-filters__button--active');
  currentFilter = selectedButton.id;
  updateImages();
};

// Инициализация фильтров

const renderFilters = (picturesData) => {
  pictures = picturesData;
  imageFilters.classList.remove('img-filters--inactive');

  filterButtons.forEach((button) => {
    button.addEventListener('click', onFilterChange);
  });
  updateImages();
};

export { renderFilters };

