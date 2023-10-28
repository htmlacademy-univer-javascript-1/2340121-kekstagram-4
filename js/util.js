import {commentMessages, commentNames} from './util-data.js';

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

let currentId = 1;

const generateCommentId = createRandomIdFromRangeGenerator(0, 1000);

function createComment() {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomCommentMessage(),
    name: getRandomCommentName(),
  };
}

function createPost() {
  return {
    id: currentId,
    url: `photos/${currentId++}.jpg`,
    description: 'ОПИСАНИЕ',
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
  };
}

function createPosts(n) {
  return Array.from({length: n}, createPost);
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function shuffle(arr){
  let j, temp;
  for(let i = arr.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

export {getRandomInteger, createRandomIdFromRangeGenerator, getRandomCommentMessage, getRandomCommentName, createPosts, debounce, shuffle};
