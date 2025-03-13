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

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num % 100 < 21) {
    return genitivePlural;
  }
  return num % 10 === 1
    ? nominative
    : genitiveSingular;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getTemplate, isEscapeKey, numDecline };
