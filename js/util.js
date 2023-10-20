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

export {getRandomInteger, createRandomIdFromRangeGenerator, getRandomCommentMessage, getRandomCommentName};
