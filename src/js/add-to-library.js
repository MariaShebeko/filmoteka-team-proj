import refs from './refs/refs';
import { dataFilm } from './modal-film.js';

const { modalFilmEl } = refs;

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
  } else if (getLocalStorageArray('watched').some(el => el.title === dataFilm.title)) {
    deleteFromArray(e, 'watched');
  } else {
    addToArray(e, 'watched');
  }
}

function addToQueue(e) {
  if (!localStorage.getItem('queue')) {
    const firstArray = [];
    addToFirstArray(e, 'queue', firstArray);
  } else if (getLocalStorageArray('queue').some(el => el.title === dataFilm.title)) {
    deleteFromArray(e, 'queue');
  } else {
    addToArray(e, 'queue');
  }
}

function addToFirstArray(e, keyLocal, firstArray) {
  firstArray.push(dataFilm);
  setLocalStorageArray(keyLocal, firstArray);
  if (keyLocal === 'watched') e.target.textContent = 'REMOVE FROM WATCHED';
  if (keyLocal === 'queue') e.target.textContent = 'REMOVE FROM QUEUE';
}

function addToArray(e, keyLocal) {
  const array = getLocalStorageArray(keyLocal);
  array.push(dataFilm);
  setLocalStorageArray(keyLocal, array);
  if (keyLocal === 'watched') e.target.textContent = 'REMOVE FROM WATCHED';
  if (keyLocal === 'queue') e.target.textContent = 'REMOVE FROM QUEUE';
}

function deleteFromArray(e, keyLocal) {
  const array = getLocalStorageArray(keyLocal);
  array.splice(
    array.findIndex(el => el.title === dataFilm.title),
    1,
  );
  setLocalStorageArray(keyLocal, array);
  if (keyLocal === 'watched') e.target.textContent = 'ADD TO WATCHED';
  if (keyLocal === 'queue') e.target.textContent = 'ADD TO QUEUE';
}

function setLocalStorageArray(keyLocal, array) {
  localStorage.setItem(keyLocal, JSON.stringify(array));
}

function getLocalStorageArray(keyLocal) {
  return JSON.parse(localStorage.getItem(keyLocal));
}
