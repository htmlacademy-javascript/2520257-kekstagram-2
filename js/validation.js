const uploadForm = document.querySelector('.img-upload__form');


const pristine = new Pristine(uploadForm, {
  classTo: 'form__item', // Элемент, на который будут добавляться классы
  errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'form__item', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
}, false); //если не хотите, чтобы Pristine валидировала форму по мере ввода, то передайте при подключении третьим аргументом false.

function validateNickname (value) {
  return value.length >= 2 && value.length <= 50;
}

pristine.addValidator(
  orderForm.querySelector('#nickname'),
  validateNickname,
  'От 2 до 50 символов'
);

//Третьим аргументом нужно передать сообщение об ошибке.

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const amountField = orderForm.querySelector('#amount');
const maxAmount = {
  's': 10,
  'm': 5
};

// function validateAmount (value) {
//   const unit = orderForm.querySelector('[name="unit"]:checked');
//   return value.length && parseInt(value) <= maxAmount[unit.value];
// }

function getAmountErrorMessage () {
  const unit = orderForm.querySelector('[name="unit"]:checked');
  return `Не больше ${maxAmount[unit.value]} штук в одни руки`;
}

function onUnitChange () {
  amountField.placeholder = maxAmount[this.value];
  pristine.validate(amountField);
}

orderForm.querySelectorAll('[name="unit"]').forEach((item) => item.addEventListener('change', onUnitChange));

const deliveryField = orderForm.querySelector('[name="delivery"]');
const dateField = orderForm.querySelector('[name="date"]');
const deliveryOption = {
  'Доставка': ['Завтра', 'На выходных'],
  'Самовывоз': ['Сегодня', 'Завтра']
};

function validateDelivery () {
  return deliveryOption[deliveryField.value].includes(dateField.value);
}

function getDeliveryErrorMessage () {
  return `
    ${deliveryField.value}
    ${dateField.value.toLowerCase()}
    ${deliveryField.value === 'Доставка' ? 'невозможна' : 'невозможен'}
  `;
}

pristine.addValidator(deliveryField, validateDelivery, getDeliveryErrorMessage);
pristine.addValidator(dateField, validateDelivery, getDeliveryErrorMessage);
pristine.addValidator(amountField, validateAmount, getAmountErrorMessage);


