//import { showErrorMessage } from './modal-form/validation';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/';
const Route = {
  GET_DATA: 'kekstagram/data',
  SEND_DATA: 'kekstagram',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте еще раз.',
  [Method.POST]: 'Не удалось отправить данные. Попробуйте еще раз',
};

const load = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(ErrorText[method]);
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(ErrorText[method]);
      //showErrorMessage(error.message);
    });

const getData = () => load(Route.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

export {getData, sendData};
