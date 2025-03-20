const REMOVE_MESSAGE_TIMEOUT = 5000;

// Функция для проверки и вывода шаблона

const getTemplate = (id) => {
  const template = document.querySelector(id);

  if (!template) {
    throw new Error(`Template not found: #${id}`);
  }

  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Nota a template: #${id}`);
  }

  return template.content.firstElementChild;
};

// Функция склонения слов после чисел

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num % 100 < 21) {
    return genitivePlural;
  }
  return num % 10 === 1
    ? nominative
    : genitiveSingular;
};

// Устранение "дребезга"

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

// Устранение задержки между кадрами

// function throttle (callback, delayBetweenFrames) {
//   let lastTime = 0;

//   return (...rest) => {
//     const now = new Date();

//     if (now - lastTime >= delayBetweenFrames) {
//       callback.apply(this, rest);
//       lastTime = now;
//     }
//   };
// }

// Кнопка esc

const isEscapeKey = (evt) => evt.key === 'Escape';

// Показ окна об ошибке с задержкой 5 секунд

const showDataError = () => {
  const errorTemplate = getTemplate('#data-error');
  const errorModal = errorTemplate.cloneNode(true);

  document.body.append(errorModal);

  setTimeout(() => {
    errorModal.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

export { getTemplate, isEscapeKey, numDecline, debounce, showDataError};
