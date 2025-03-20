// Константы для масштабирования

const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;

// Элементы управления масштабом

const scaleValue = document.querySelector('.scale__control--value');
const decreaseButton = document.querySelector('.scale__control--smaller');
const increaseButton = document.querySelector('.scale__control--bigger');
const uploadImage = document.querySelector('.img-upload__preview img');

// Текущее значение масштаба

let currentValue = MAX_SCALE;

// Обновление значения масштаба

const updateScale = () => {
  scaleValue.value = `${currentValue}%`;
  uploadImage.style.transform = `scale(${currentValue / 100})`;

  increaseButton.disabled = currentValue >= MAX_SCALE;
  decreaseButton.disabled = currentValue <= MIN_SCALE;
};

// Увеличение масштаба

const onIncreaseButtonClick = () => {
  if (currentValue < MAX_SCALE) {
    currentValue += SCALE_STEP;
    updateScale();
  }
};

// Уменьшение масштаба

const onDecreaseButtonClick = () => {
  if (currentValue > MIN_SCALE) {
    currentValue -= SCALE_STEP;
    updateScale();
  }
};


// Сброс масштаба

const resetScale = () => {
  currentValue = MAX_SCALE;
  updateScale();
};


// Добавляем обработчики для кнопок

increaseButton.addEventListener('click', onIncreaseButtonClick);
decreaseButton.addEventListener('click', onDecreaseButtonClick);

export { resetScale };
