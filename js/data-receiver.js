/* eslint-disable no-unused-vars */
import { getData } from './data-loader.js';
import { renderPictures } from './pictures-drawer.js';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

const setDataFromServer = () => {
  getData()
    .then((pictures) => {
      renderPictures(pictures);
    })
    .catch((error) => {
      showAlert(error.message);
    });
};

export {setDataFromServer};
