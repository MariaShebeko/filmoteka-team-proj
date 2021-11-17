import refs from './refs/refs';
import { objectFilm, changeModalButtonsLanguage } from './modal-film.js';

const { modalFilmEl, languagesToggleEl } = refs;

function addToLibrary(e) {
  if (e.target.dataset.value !== 'watched' && e.target.dataset.value !== 'queue') return;
  if (e.target.dataset.value === 'watched') addToWatched(e);
  if (e.target.dataset.value === 'queue') addToQueue(e);
}

modalFilmEl.addEventListener('click', addToLibrary);

function addToWatched(e) {
  if (!localStorage.getItem('watched')) {
    const firstArray = [];
    addToFirstArray(e, 'watched', firstArray);
  } else if (getLocalStorageArray('watched').some(el => el.id === objectFilm.id)) {
    deleteFromArray(e, 'watched');
  } else {
    addToArray(e, 'watched');
  }
}

function addToQueue(e) {
  if (!localStorage.getItem('queue')) {
    const firstArray = [];
    addToFirstArray(e, 'queue', firstArray);
  } else if (getLocalStorageArray('queue').some(el => el.id === objectFilm.id)) {
    deleteFromArray(e, 'queue');
  } else {
    addToArray(e, 'queue');
  }
}

function addToFirstArray(e, keyLocal, firstArray) {
  firstArray.push(objectFilm);
  setLocalStorageArray(keyLocal, firstArray);
  if (keyLocal === 'watched') e.target.textContent = 'REMOVE FROM WATCHED';
  if (keyLocal === 'queue') e.target.textContent = 'REMOVE FROM QUEUE';
  if (languagesToggleEl.checked) changeModalButtonsLanguage();
}

function addToArray(e, keyLocal) {
  const array = getLocalStorageArray(keyLocal);
  array.push(objectFilm);
  setLocalStorageArray(keyLocal, array);
  if (keyLocal === 'watched') e.target.textContent = 'REMOVE FROM WATCHED';
  if (keyLocal === 'queue') e.target.textContent = 'REMOVE FROM QUEUE';
  if (languagesToggleEl.checked) changeModalButtonsLanguage();
}

function deleteFromArray(e, keyLocal) {
  const array = getLocalStorageArray(keyLocal);
  array.splice(
    array.findIndex(el => el.id === objectFilm.id),
    1,
  );
  setLocalStorageArray(keyLocal, array);
  if (keyLocal === 'watched') e.target.textContent = 'ADD TO WATCHED';
  if (keyLocal === 'queue') e.target.textContent = 'ADD TO QUEUE';
  if (languagesToggleEl.checked) changeModalButtonsLanguage();
}

function setLocalStorageArray(keyLocal, array) {
  localStorage.setItem(keyLocal, JSON.stringify(array));
}

function getLocalStorageArray(keyLocal) {
  return JSON.parse(localStorage.getItem(keyLocal));
}
