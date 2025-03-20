// Фильтр по умолчанию

const DEFAULT_EFFECT = 'none';

// массив Фильтров

const effects = {
  none: { filter: '', min: 0, max: 100, step: 1, unit: '' },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' }
};

// Элементы управления слайдером

const uploadForm = document.querySelector('.img-upload__form');
const uploadImage = uploadForm.querySelector('.img-upload__preview img');
const effectLevelField = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelValue = effectLevelField.querySelector('.effect-level__value');
const effectSlider = effectLevelField.querySelector('.effect-level__slider');

// Текущее значение эффекта

let currentEffect = DEFAULT_EFFECT;

// Создаем слайдер

noUiSlider.create(effectSlider, {
  range: {
    min: effects[DEFAULT_EFFECT].min,
    max: effects[DEFAULT_EFFECT].max,
  },
  start: effects[DEFAULT_EFFECT].max,
  step: effects[DEFAULT_EFFECT].step,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
    from: (value) => parseFloat(value)
  }
});

const slider = effectSlider.noUiSlider;

// Применяем эффект к изображению

const applyEffect = (effect, value) => {
  const filter = effects[effect];

  uploadImage.style.filter = `${filter.filter}(${value}${filter.unit})`;
};


// Обновляем слайдер и применяем эффект

const updateEffect = (effect) => {
  if (effect === 'none') {
    effectLevelField.classList.add('hidden');
    uploadImage.style.filter = 'none';
    uploadImage.className = '';
  } else {
    effectLevelField.classList.remove('hidden');
    slider.updateOptions({
      range: {
        min: effects[effect].min,
        max: effects[effect].max,
      },
      step: effects[effect].step,
      start: effects[effect].max,
    });
    applyEffect(effect, slider.get());
  }
};

// Сбрасываем слайдер

const resetEffects = () => {
  uploadImage.style.filter = 'none';
  uploadImage.className = '';
  effectLevelValue.value = effects[DEFAULT_EFFECT].max;
  currentEffect = DEFAULT_EFFECT;

  slider.updateOptions({
    range: {
      min: effects[DEFAULT_EFFECT].min,
      max: effects[DEFAULT_EFFECT].max,
    },
    start: effects[DEFAULT_EFFECT].max,
    step: effects[DEFAULT_EFFECT].step,
  });


  effectLevelField.classList.add('hidden');
  uploadForm.reset();
};

// Обработчик изменения радио-кнопок

const onFormUpdate = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = evt.target.value;
    updateEffect(currentEffect);
  }
};

// Обработчик изменения слайдера

const onSliderUpdate = () => {
  effectLevelValue.value = slider.get();
  if (currentEffect !== 'none' && effects[currentEffect]) {
    applyEffect(currentEffect, slider.get());
  }
};

// Инициализация

effectLevelField.classList.add('hidden');
uploadForm.addEventListener('change', onFormUpdate);
slider.on('update', onSliderUpdate);

export { resetEffects };
