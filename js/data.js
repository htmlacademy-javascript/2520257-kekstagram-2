import { getRandomArrayElement, getRandomInteger } from './utils/randomizer.js';

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Петя',
  'Катя',
  'Артём',
  'Лена',
  'Паша',
  'Саша',
  'Кот',
  'Колбаса'
];

const DESCRIPTIONS = [
  'Невероятно',
  'Изимительно',
  'Картошка',
  'Чебурек',
  'Исусья тряпка',
  'Убийца',
  'По умолчанию',
  'Вид на что-то'
];

const PHOTOS_COUNT = 25;

const AvatarCount = {
  MIN: 1,
  MAX: 6
};

const Likes = {
  MIN: 15,
  MAX: 200
};

const Comments = {
  MIN: 0,
  MAX: 30
};

//получение коментариев

const generateComments = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomInteger(AvatarCount.MIN, AvatarCount.MAX)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES)
});


const getComments = () => {
  const comments = [];

  for (let i = 0; i <= getRandomInteger(Comments.MIN, Comments.MAX); i++) {
    comments.push(generateComments(i));
  }

  return comments;
};

//Генерация фото и описаний

const getPhotos = () => {
  const photos = [];

  for (let j = 1; j <= PHOTOS_COUNT; j++) {
    photos.push({
      id: j,
      url: `photos/${j}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(Likes.MIN, Likes.MAX),
      comments: getComments()
    });
  }

  return photos;
};

export { getPhotos };

// const generateProfiles = Array.from({length: PROFILES_COUNT}, getProfile);
