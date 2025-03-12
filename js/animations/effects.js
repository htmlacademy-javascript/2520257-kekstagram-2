import '.../vendor/nouislider/nouislider.js';

//const uploadForm = document.querySelector('.img-upload__form');
//const uploadImage = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = effectLevel.querySelector('.effect-level__value');
const effectSlider = effectLevel.querySelector('.effect-level__slider');
//const effectPreviews = document.querySelectorAll('.effects__preview');
const effectRadioButtons = document.querySelectorAll('.effects__radio');

// массив Фильтров

const EFFECTS = [
  none: {
    filter: '', min: 0, max: 100, step: 1, unit: ' '},
  chrome: {
    filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: ' '},
  sepia: {
    filter: 'sepia', min: 0, max: 1, step: 0.1, unit: ' '},
  marvin: {
    filter: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  phobos: {
    filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  heat: {
    filter: 'brightness', min: 1, max: 3, step: 0.1, unit: ' '}
];

// Фильтр по умолчанию

const DEFAULT_EFFECT = EFFECTS[0];

let currentEffect = DEFAULT_EFFECT;

// Создаем слайдер

const slider = noUiSlider.create(effectSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// Обновляем слайдер

const updateEffect = (currentEffect) => {
  effectSlider.classList.remove('hidden');
  slider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max,
  });

  if (currentEffect === DEFAULT_EFFECT) {
    effectSlider.classList.add('hidden');
  }
};

// Ищем в массиве

const onEffectChange = (evt) => {
  currentEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateEffect(currentEffect);
}


effectRadioButtons.forEach((radio) => {
  radio.addEventListener('change', (evt) => {
    currentEffect = evt.target.value;
    if (currentEffect) {
    updateEffect();



    }
});

//

slider.on('update', onEffectChange);


slider.on('update', () => {
  effectLevelValue.value = slider.get();
});

//slider.destroy();


//Настройка глубины с помощью слайдера

// Наложение эффекта на изображение:

// По умолчанию должен быть выбран эффект «Оригинал».
// На изображение может накладываться только один эффект.
// Интенсивность эффекта регулируется перемещением ползунка в слайдере. Слайдер реализуется сторонней библиотекой для реализации слайдеров noUiSlider. Уровень эффекта записывается в поле .effect-level__value в виде числа. При изменении уровня интенсивности эффекта (предоставляется API слайдера), CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
// Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// Для эффекта «Оригинал» CSS-стили filter удаляются.
// При выборе эффекта «Оригинал» слайдер и его контейнер (элемент .img-upload__effect-level) скрываются.
// При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.
