import refs from './refs/refs';
import { dataFilm } from './modalFilm.js';

const { modalFilmEl } = refs;

const arrayWatched = [];

function addToArrayWatched(e) {
  if (e.target.dataset.value !== 'watched') return;
  arrayWatched.push(dataFilm);
  setLocalArrayWatched();
}

function setLocalArrayWatched() {
  localStorage.setItem('watched', JSON.stringify(arrayWatched));
}

modalFilmEl.addEventListener('click', addToArrayWatched);
