import refs from './refs/refs';
import { dataFilm } from './modal-film.js';

const { modalFilmEl } = refs;

function watched(e) {
  if (e.target.dataset.value !== 'watched') return;
  if (!localStorage.getItem('watched')) {
    const arrayWatched = [];
    addToArrayWatchedFirst(e, arrayWatched);
  } else if (JSON.parse(localStorage.getItem('watched')).some(el => el.title === dataFilm.title)) {
    deleteFromArrayWatched(e);
  } else {
    addToArrayWatched(e);
  }
}

function addToArrayWatchedFirst(e, arrayWatched) {
  arrayWatched.push(dataFilm);
  setLocalArrayWatched(arrayWatched);
  e.target.textContent = 'REMOVE FROM WATCHED';
}

function addToArrayWatched(e) {
  const newArrayWatched = JSON.parse(localStorage.getItem('watched'));
  newArrayWatched.push(dataFilm);
  setLocalArrayWatched(newArrayWatched);
  e.target.textContent = 'REMOVE FROM WATCHED';
}

function deleteFromArrayWatched(e) {
  const newArrayWatched = JSON.parse(localStorage.getItem('watched'));
  newArrayWatched.splice(
    newArrayWatched.findIndex(el => el.title === dataFilm.title),
    1,
  );
  setLocalArrayWatched(newArrayWatched);
  e.target.textContent = 'ADD TO WATCHED';
}

function setLocalArrayWatched(array) {
  localStorage.setItem('watched', JSON.stringify(array));
}

modalFilmEl.addEventListener('click', watched);
