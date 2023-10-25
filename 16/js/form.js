/* eslint-disable no-unused-vars */
import {getNumberFromString} from './functions.js';

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
const previewPicture = uploadForm.querySelector('.img-upload__preview img');
const slider = uploadForm.querySelector('.effect-level__slider');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');


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
  setDefaultScale();
  setDefaultFilter();
  imgOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', onDocumentKeydown);
  uploadInput.removeEventListener('ckick', openOverlay);
  imgOverlay.querySelector('img').src = URL.createObjectURL(evt.target.files[0]);
}

function closeOverlay(evt) {
  imgOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadInput.addEventListener('ckick', openOverlay);
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

function setDefaultScale() {
  scaleValue.value = '100%';
  previewPicture.style.transform = 'scale(1)';
}

function onScaleBigger(evt) {
  const currentValue = getNumberFromString(scaleValue.value);
  scaleValue.value = currentValue <= 75 ? `${currentValue + 25}%` : `${currentValue}%`;
  previewPicture.style.transform = `scale(${getNumberFromString(scaleValue.value) * 0.01})`;
}

function onScaleSmaller(evt) {
  const currentValue = getNumberFromString(scaleValue.value);
  scaleValue.value = currentValue >= 50 ? `${currentValue - 25}%` : `${currentValue}%`;
  previewPicture.style.transform = `scale(${getNumberFromString(scaleValue.value) * 0.01})`;
}

scaleBigger.addEventListener('click', onScaleBigger);
scaleSmaller.addEventListener('click', onScaleSmaller);

//----------- End scaling ------------------------


//----------- Filtering image --------------------

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

function setDefaultFilter() {
  previewPicture.style.filter = 'none';
  slider.noUiSlider.set(0);
}

function onFilterClick(evt) {
  const effect = evt.target.value;
  setDefaultFilter();
  if (effect === 'none') {
    slider.setAttribute('disabled', true);
  } else {
    slider.removeAttribute('disabled');
  }
  switch (effect) {
    case 'chrome':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 0,
        step: 0.1
      });
      break;
    case 'sepia':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 0,
        step: 0.1
      });
      break;
    case 'marvin':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 0,
        step: 1
      });
      break;
    case 'phobos':
      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 0,
        step: 0.1
      });
      break;
    case 'heat':
      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 1,
        step: 0.1
      });
      slider.noUiSlider.set(1);
      break;
  }
}

slider.noUiSlider.on('update', () => {
  effectLevelValue.value = slider.noUiSlider.get();
  const effect = uploadForm.querySelector('.effects__radio:checked').value;
  switch (effect) {
    case 'chrome':
      previewPicture.style.filter = `grayscale(${effectLevelValue.value})`;
      break;
    case 'sepia':
      previewPicture.style.filter = `sepia(${effectLevelValue.value})`;
      break;
    case 'marvin':
      previewPicture.style.filter = `invert(${effectLevelValue.value}%)`;
      break;
    case 'phobos':
      previewPicture.style.filter = `blur(${effectLevelValue.value}px)`;
      break;
    case 'heat':
      previewPicture.style.filter = `brightness(${effectLevelValue.value})`;
      break;
  }
});

document.querySelectorAll('.effects__radio').forEach((li) => {
  li.addEventListener('click', onFilterClick);
});

//----------- End filtering ----------------------


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


