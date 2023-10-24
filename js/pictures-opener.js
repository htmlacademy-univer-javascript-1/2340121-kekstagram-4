const commentTemplate = document.querySelector('.social__comment');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closePicture(evt);
  }
};

function openPicture(evt, url, description, likes, comments) {
  const openedPicture = document.querySelector('.big-picture');
  openedPicture.classList.remove('hidden');
  openedPicture.querySelector('.big-picture__img img').src = url;
  openedPicture.querySelector('.likes-count').textContent = likes;
  openedPicture.querySelector('.comments-count').textContent = comments.length;
  openedPicture.querySelector('.social__caption').textContent = description;

  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; ++i) {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = comments[i].avatar;
    comment.querySelector('.social__picture').alt = comments[i].name;
    comment.querySelector('.social__text').textContent = comments[i].message;
    commentsFragment.append(comment);
  }


  const commentsContainer = document.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');

  openedPicture.querySelector('.big-picture__cancel').addEventListener('click', closePicture);
  document.addEventListener('keydown', onDocumentKeydown);
}

function closePicture(evt) {
  document.body.classList.remove('modal-open');
  document.querySelector('.big-picture').classList.add('hidden');
  evt.target.removeEventListener('click', closePicture);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export {openPicture};
