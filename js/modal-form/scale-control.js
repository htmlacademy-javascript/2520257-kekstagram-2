// Элементы управления масштабом

const uploadOverlay = document.querySelector('.img-upload__overlay');

const scaleControl = uploadOverlay.querySelectorAll('.scale__control');
const uploadImage = uploadOverlay.querySelector('.img-upload__preview img');

// Константы для масштабирования

const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
let currentValue = 100;

// Обновление значения масштаба

const changeScale = () => {
  scaleControl[2].removeAttribute('disabled');
  scaleControl[0].removeAttribute('disabled');
  scaleControl[1].value = `${currentValue}%`;
  uploadImage.style.transform = `scale(${currentValue / 100})`;

  if (currentValue >= MAX_SCALE) {
    scaleControl[2].setAttribute('disabled', '');
  }
  if (currentValue <= MIN_SCALE) {
    scaleControl[0].setAttribute('disabled', '');
  }
};

// Сброс масштаба

const resetScale = () => {
  currentValue = MAX_SCALE;
  scaleControl[1].value = `${currentValue}%`;
  uploadImage.style.transform = 'scale(1.00)';
  scaleControl[2].removeAttribute('disabled');
  scaleControl[0].removeAttribute('disabled');
  scaleControl[2].setAttribute('disabled', '');
};

// Кнопка Увеличить

scaleControl[2].addEventListener('click', () => {
  if (currentValue < MAX_SCALE) {
    currentValue += SCALE_STEP;
    changeScale();
  }
});

// Кнопка Уменьшить

scaleControl[0].addEventListener('click', () => {
  if (currentValue > MIN_SCALE) {
    currentValue -= SCALE_STEP;
    changeScale();
  }
});

export { resetScale };
