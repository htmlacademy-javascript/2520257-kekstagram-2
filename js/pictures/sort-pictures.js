import { debounce } from '../utils/dom';
import { renderThumbnails } from './thumbnails';

// Константы

const RERENDER_DELAY = 500;
const RANDOM_IMAGES_NUMBER = 10;
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

// Типы фильтров

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

// Массив миниатюр и текущий фильтр

let pictures = [];
let currentFilter = Filter.DEFAULT;

// Элементы фильтров

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

// Функция для применения сортировки

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

// Функция для обновления отображения изображений с устранением дребезга

const updateImages = debounce(() => {
  const filteredImages = applyFilter(pictures, currentFilter);
  renderThumbnails(filteredImages);
}, RERENDER_DELAY);

// Обработчик изменения фильтра

const onButtonClick = (evt) => {
  const selectedButton = evt.target;
  if (selectedButton.classList.contains(ACTIVE_BUTTON_CLASS)) {
    return;
  }
  filterButtons.forEach((button) => button.classList.remove(ACTIVE_BUTTON_CLASS));
  selectedButton.classList.add(ACTIVE_BUTTON_CLASS);
  currentFilter = selectedButton.id;
  updateImages();
};

// Инициализация фильтров

const renderFilters = (picturesData) => {
  pictures = picturesData;
  imageFilters.classList.remove('img-filters--inactive');

  filterButtons.forEach((button) => {
    button.addEventListener('click', onButtonClick);
  });
  updateImages();
};

export { renderFilters };

