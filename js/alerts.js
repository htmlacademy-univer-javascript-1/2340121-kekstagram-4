/* eslint-disable no-unused-vars */
import { showOverlay } from './form.js';

const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successButton = successMessage.querySelector('.success__button');
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

function openFormSuccessMessage() {
  document.body.append(successMessage);
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onSuccessKeydown);
  successMessage.addEventListener('click', onSuccessClick);
}

function closeSuccessMessage() {
  successMessage.remove();
  successButton.removeEventListener('click', onSuccessButtonClick);
  document.removeEventListener('keydown', onSuccessKeydown);
  successMessage.removeEventListener('click', onSuccessClick);
}

function openFormErrorMessage() {
  document.body.append(errorMessage);
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onErrorKeydown);
  errorMessage.addEventListener('click', onErrorClick);
}

function closeErrorMessage() {
  errorMessage.remove();
  errorButton.removeEventListener('click', onErrorButtonClick);
  document.removeEventListener('keydown', onErrorKeydown);
  errorMessage.removeEventListener('click', onErrorClick);
  showOverlay();
}

function onSuccessButtonClick(evt) {
  closeSuccessMessage();
}

function onSuccessKeydown(evt) {
  if (evt.key === 'Escape') {
    closeSuccessMessage();
  }
}

function onSuccessClick(evt) {
  if (evt.target !== successMessage.querySelector('.success__inner') && evt.target !== successMessage.querySelector('.success__title')) {
    closeSuccessMessage();
  }
}

function onErrorButtonClick(evt) {
  closeErrorMessage();
}

function onErrorKeydown(evt) {
  if (evt.key === 'Escape') {
    closeErrorMessage();
  }
}

function onErrorClick(evt) {
  if (evt.target !== errorMessage.querySelector('.error__inner') && evt.target !== errorMessage.querySelector('.error__title')) {
    closeErrorMessage();
  }
}

export {openFormSuccessMessage, openFormErrorMessage};
