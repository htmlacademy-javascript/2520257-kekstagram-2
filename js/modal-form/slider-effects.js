const uploadForm = document.querySelector('.img-upload__form');
const uploadImage = document.querySelector('.img-upload__preview img');
const uploadWrapper = document.querySelector('.img-upload__wrapper');
const effectLevelField = uploadWrapper.querySelector('.img-upload__effect-level');
const effectLevelValue = effectLevelField.querySelector('.effect-level__value');
const effectSlider = effectLevelField.querySelector('.effect-level__slider');
const effectRadioButtons = document.querySelectorAll('.effects__radio');

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

noUiSlider.create(effectSlider, {
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

const slider = effectSlider.noUiSlider;

// Обновляем слайдер

const updateEffect = (effect) => {
  effectLevelField.classList.remove('hidden');

  slider.updateOptions({
    range: {
      min: effects[effect].min,
      max: effects[effect].max,
    },
    step: effects[effect].step,
    start: effects[effect].max,
  });

  if (effect === DEFAULT_EFFECT) {
    effectLevelField.classList.add('hidden');
  }
};

//Находим эффект в форме

const onFormUpdate = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  for (const effectTarget in effects) {
    if (effectTarget === evt.target.value) {
      currentEffect = effectTarget;
      console.log(effectTarget);
      break;
    }
  }
  updateEffect(currentEffect);
};

effectRadioButtons.forEach((element) => {
  element.addEventListener('change', (radio) => {
    if (radio.target.checked) {
      if (radio.value !== 'none') {
        uploadImage.style.filter = `${currentEffect.style}(${effectLevelValue.value}${currentEffect.unit})`;
      }
    }
  });
});


//Применяем эффект к изображению

const onEffectUpdate = () => {
  uploadImage.style.filter = 'none';
  uploadImage.className = '';
  effectLevelValue.value = slider.get();

  //const effectValue = slider.get();

};


// const onRadioButtonUpdate = (radio) {
// }


slider.on('update', onEffectUpdate);
//effectRadioButtons.addEventListener('change', onRadioButtonUpdate);
uploadForm.addEventListener('change', onFormUpdate);


