/* eslint-disable no-unused-vars */
let currentId = 1;

const commentMessages = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const commentNames = [
  'Пал-1ела',
  'Г1урт-Хьасан',
  'Вирголий',
  'Ж1ардада',
  'Румпельштрудель',
  'ыыыыы'
];

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      previousValues.length = 0;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function getRandomCommentMessage() {
  let output = '';
  for (let i = 0; i < getRandomInteger(1, 2); ++i) {
    if (i !== 0) {
      output += ' ';
    }
    output += commentMessages[getRandomInteger(0, commentMessages.length - 1)];
  }
  return output;
}

function getRandomCommentName() {
  return commentNames[getRandomInteger(0, commentNames.length - 1)];
}

const generateCommentId = createRandomIdFromRangeGenerator(0, 1000);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomCommentMessage(),
  name: getRandomCommentName(),
});

const createPost = () => ({
  id: currentId,
  url: `photos/${currentId++}.jpg`,
  description: 'ОПИСАНИЕ',
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
});

function create25Posts() {
  return Array.from({length: 25}, createPost);
}
