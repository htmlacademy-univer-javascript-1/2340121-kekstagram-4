import {openPicture} from './pictures-opener.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

const renderPictures = (posts) => {
  posts.forEach(({url, description, likes, comments}) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('img').src = url;
    picture.querySelector('img').alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.addEventListener('click', (evt) => {
      openPicture(evt, url, description, likes, comments);
    });
    picturesFragment.append(picture);
  });
  picturesContainer.append(picturesFragment);
};


export {renderPictures};

