// Константы для масштабирования

const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
let currentValue = MAX_SCALE;

// Элементы управления масштабом

const scaleValue = document.querySelector('.scale__control--value');
const decreaseButton = document.querySelector('.scale__control--smaller');
const increaseButton = document.querySelector('.scale__control--bigger');
const uploadImage = document.querySelector('.img-upload__preview img');

// Обновление значения масштаба

const changeScale = () => {
  scaleValue.value = `${currentValue}%`;
  uploadImage.style.transform = `scale(${currentValue / 100})`;

  increaseButton.disabled = currentValue >= MAX_SCALE;
  decreaseButton.disabled = currentValue <= MIN_SCALE;
};

// Сброс масштаба

const resetScale = () => {
  currentValue = MAX_SCALE;
  scaleValue.value = `${currentValue}%`;
  uploadImage.style.transform = 'scale(1.00)';
  increaseButton.disabled = false;
  decreaseButton.disabled = false;
  changeScale();
};

// Кнопка Увеличить

const increaseScale = () => {
  if (currentValue < MAX_SCALE) {
    currentValue += SCALE_STEP;
    changeScale();
  }
};

// Кнопка Уменьшить

const decreaseScale = () => {
  if (currentValue > MIN_SCALE) {
    currentValue -= SCALE_STEP;
    changeScale();
  }
};

// Добавляем обработчики для кнопок

increaseButton.addEventListener('click', increaseScale);
decreaseButton.addEventListener('click', decreaseScale);

export { resetScale };
