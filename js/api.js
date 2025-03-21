// Базовый URL

const BASE_URL = 'https://31.javascript.htmlacademy.pro/';

// Пути для запросов

const Route = {
  GET_DATA: 'kekstagram/data/',
  SEND_DATA: 'kekstagram/',
};

// Методы запросов

const Method = {
  GET: 'GET',
  POST: 'POST',
};

// Тексты ошибок в заивимости от типа запроса

const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте еще раз.',
  [Method.POST]: 'Не удалось отправить данные. Попробуйте еще раз',
};

// Функция для выполнения метода запроса

const load = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(ErrorText[method]);
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(`${ErrorText[method]} ${error.message}`);
    });

// Функция для получения данных

const getData = () => load(Route.GET_DATA);

// Функция для отправки данных

const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

export {getData, sendData};
