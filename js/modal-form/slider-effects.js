const uploadForm = document.querySelector('.img-upload__form');
const uploadImage = uploadForm.querySelector('.img-upload__preview img');
const effectLevelField = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelValue = effectLevelField.querySelector('.effect-level__value');
const effectSlider = effectLevelField.querySelector('.effect-level__slider');

// массив Фильтров

const effects = {
  none: { filter: '', min: 0, max: 100, step: 1, unit: '' },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' }
};

// Фильтр по умолчанию

const DEFAULT_EFFECT = 'none';
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


// наброски
// const updateEffect = (effect) => {
//   effectLevelField.classList.remove('hidden');

//   slider.updateOptions({
//     range: {
//       min: effects[effect].min,
//       max: effects[effect].max,
//     },
//     step: effects[effect].step,
//     start: effects[effect].max,
//   });

//   if (effect === DEFAULT_EFFECT) {
//     effectLevelField.classList.add('hidden');
//   }
// };

// //Находим эффект в форме

// const onFormUpdate = (evt) => {
//   if (!evt.target.classList.contains('effects__radio')) {
//     return;
//   }
//   for (const effectTarget in effects) {
//     if (effectTarget === evt.target.value) {
//       currentEffect = effectTarget;
//       console.log(effectTarget);
//       break;
//     }
//   }
//   updateEffect(currentEffect);
// };

// effectRadioButtons.forEach((element) => {
//   element.addEventListener('change', (radio) => {
//     if (radio.target.checked) {
//       if (radio.value !== 'none') {
//         uploadImage.style.filter = `${currentEffect.style}(${effectLevelValue.value}${currentEffect.unit})`;
//       }
//     }
//   });
// });


// //Применяем эффект к изображению

// const onEffectUpdate = () => {
//   uploadImage.style.filter = 'none';
//   uploadImage.className = '';
//   effectLevelValue.value = slider.get();

//   //const effectValue = slider.get();

// };


// // const onRadioButtonUpdate = (radio) {
// // }


// slider.on('update', onEffectUpdate);
// //effectRadioButtons.addEventListener('change', onRadioButtonUpdate);
// uploadForm.addEventListener('change', onFormUpdate);


