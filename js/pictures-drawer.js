import {createPosts} from './main.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const randomPosts = createPosts(25);
const picturesFragment = document.createDocumentFragment();

randomPosts.forEach(({url, description, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('img').src = url;
  picture.querySelector('img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picturesFragment.append(picture);
});

picturesContainer.append(picturesFragment);

