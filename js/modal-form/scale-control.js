const uploadOverlay = document.querySelector('.img-upload__overlay');

//изменение масштаба изображения

const scaleControl = uploadOverlay.querySelectorAll('.scale__control');
const uploadImage = uploadOverlay.querySelector('.img-upload__preview img');

const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
let currentValue = 100;

// Обновление значения

const changeScale = () => {
  scaleControl[2].removeAttribute('disabled', '');
  scaleControl[0].removeAttribute('disabled', '');
  scaleControl[1].value = `${currentValue}%`;
  uploadImage.style.transform = `scale(${currentValue / 100})`;
};

// Сброс значения

const resetScale = () => {
  scaleControl.value = '100%';
  uploadImage.style.transform = 'scale(1.00)';
};

// Кнопка увеличить

scaleControl[2].addEventListener('click', () => {
  if (currentValue < MAX_SCALE) {
    currentValue += SCALE_STEP;
    changeScale();
  } else {
    scaleControl[2].setAttribute('disabled', '');
  }
  return currentValue;
});

// Кнопка уменьшить

scaleControl[0].addEventListener('click', () => {
  if (currentValue > MIN_SCALE) {
    currentValue -= SCALE_STEP;
    changeScale();
  } else {
    scaleControl[0].setAttribute('disabled', '');
  }
  return currentValue;
});

export { resetScale };
