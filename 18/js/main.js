/* eslint-disable no-unused-vars */
import { openFormSuccessMessage, openFormErrorMessage } from './alerts.js';
import { setUserFormSubmit } from './form.js';
import { setDataFromServer } from './data-receiver.js';

setUserFormSubmit(openFormSuccessMessage, openFormErrorMessage);
setDataFromServer();

