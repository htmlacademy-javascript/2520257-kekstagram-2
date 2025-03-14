const uploadForm = document.querySelector('.img-upload__form');
const uploadImage = document.querySelector('.img-upload__preview img');
const uploadWrapper = document.querySelector('.img-upload__wrapper');
const effectLevel = uploadWrapper.querySelector('.img-upload__effect-level');
//const effectLevelValue = effectLevel.querySelector('.effect-level__value');
const effectSlider = effectLevel.querySelector('.effect-level__slider');
//const effectsList = uploadWrapper.querySelector('.effects__list');
//const effectPreviews = document.querySelectorAll('.effects__preview');
//const effectRadioButtons = document.querySelectorAll('.effects__radio');

// массив Фильтров

const effects = {
  none: { filter: '', min: 0, max: 100, step: 1, unit: '' },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' } ,
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' }
};

// Фильтр по умолчанию

const DEFAULT_EFFECT = effects.none;

let currentEffect = DEFAULT_EFFECT;

// Создаем слайдер

const slider = noUiSlider.create(effectSlider, {
  range: {
    min: currentEffect.min,
    max: currentEffect.max,
  },
  start: currentEffect.max,
  step: currentEffect.step,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
    from: (value) => parseFloat(value)
  }
});

// Обновляем слайдер

const updateEffect = (effect) => {
  effectLevel.classList.remove('hidden');

  slider.updateOptions({
    range: {
      min: effects[effect].min,
      max: effects[effect].max,
    },
    step: effects[effect].step,
    start: effects[effect].max,
  });

  if (effect === DEFAULT_EFFECT) {
    effectLevel.classList.add('hidden');
    // effectLevelValue.value = '';
  //  effectSlider.noUiSlider.updateOptions({
    //     range: { min: currentEffect.min, max: currentEffect.max },
  //   start: currentEffect.max
  //  });
  }
};

const onFormUpdate = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  for (const effectTarget in effects) {
    if (effectTarget === evt.target.value) {
      currentEffect = effectTarget;
      break;
    }
  }
  updateEffect(currentEffect);
};

const onEffectChange = () => {
  uploadImage.style.filter = 'none';
  effectLevel.value = '';

  const effectValue = slider.get();

  uploadImage.style.filter = `${currentEffect.style}(${effectValue}${currentEffect.unit})`;
  //console.log(uploadImage.style.filter);
  effectLevel.value = effectValue;
};

slider.on('update', onEffectChange);
uploadForm.addEventListener('change', onFormUpdate);


