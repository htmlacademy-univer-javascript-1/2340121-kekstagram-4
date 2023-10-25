/* eslint-disable no-unused-vars */
import { getRandomInteger, createRandomIdFromRangeGenerator, getRandomCommentMessage, getRandomCommentName } from './util.js';
let currentId = 1;

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

function createPosts(n) {
  return Array.from({length: n}, createPost);
}

export {createPosts};
