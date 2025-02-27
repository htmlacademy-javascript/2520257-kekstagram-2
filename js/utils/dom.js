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

export { getTemplate };
