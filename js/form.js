/* eslint-disable no-unused-vars */
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const imgOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const uploadButton = uploadForm.querySelector('#upload-submit');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const scaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleBigger = uploadForm.querySelector('.scale__control--bigger');
const scaleValue = uploadForm.querySelector('.scale__control--value');


//---------------------- Validation --------------------------

const regExp = /^#[0-9a-zа-яё]{1,19}$/i;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

function validateHashtagsCount(value) {
  return value.trim().split(' ').length <= 5;
}

function validateHashtagsUniqueness(value) {
  return (new Set(value.trim().split(' '))).size === value.trim().split(' ').length;
}

function validateHashtags(value) {
  if (value.length === 0) {
    return true;
  }
  const hashtags = value.trim().split(' ');
  for (let i = 0; i < hashtags.length; ++i) {
    if (!regExp.test(hashtags[i])) {
      return false;
    }
  }
  return true;
}

pristine.addValidator(
  hashtagsField,
  validateHashtagsCount,
  'Максимальное допустимое количество хэштегов - 5'
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsUniqueness,
  'Не должно быть повторяющихся хэштегов'
);

pristine.addValidator(
  hashtagsField,
  validateHashtags,
  'Ошибка в хештеге'
);

function validateDescription(value) {
  return value.trim().length <= 140;
}

pristine.addValidator(
  descriptionField,
  validateDescription,
  'Длина описания не может быть больше 140 символов'
);

//------------------- End validation ------------------------


//----------- Switching keydown event on body based on focusing/unfocusing fiels -------------

hashtagsField.addEventListener('onfocus', (evt) => {
  document.body.removeEventListener('keydown', onDocumentKeydown);
});

hashtagsField.addEventListener('onfocusout', (evt) => {
  document.body.addEventListener('keydown', onDocumentKeydown);
});

descriptionField.addEventListener('onfocus', (evt) => {
  document.body.removeEventListener('keydown', onDocumentKeydown);
});

descriptionField.addEventListener('onfocusout', (evt) => {
  document.body.addEventListener('keydown', onDocumentKeydown);
});

//--------- End switching ---------------------------------------------------------------------


//--------- Opening and closing overlay ----------

function openOverlay(evt) {
  imgOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadButton.removeEventListener('ckick', openOverlay);
  imgOverlay.querySelector('img').src = URL.createObjectURL(evt.target.files[0]);
}

function closeOverlay(evt) {
  imgOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadButton.addEventListener('ckick', openOverlay);
  uploadInput.value = null;
}

uploadInput.addEventListener('change', openOverlay);

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    closeOverlay(evt);
  }
}

//----------- End overlay ------------------------


//----------- Scaling image ----------------------

//----------- End scaling ------------------------


function onFormSubmiit(evt) {
  evt.preventDefault();
  uploadButton.setAttribute('disabled', true);
  const valid = pristine.validate();
  if (valid) {
    evt.target.submit();
  }
  uploadButton.removeAttribute('disabled');
}


uploadForm.addEventListener('submit', onFormSubmiit);


