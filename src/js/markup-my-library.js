import refs from './refs/refs';
import { getFilm } from './modalFilm.js';
import movieTemplate from '../templates/film-card-template.hbs';

let watchedFilms = [];
let queue = [];

function getWatchedFilms(data) {
  watchedFilms = JSON.parse(localStorage.getItem('watched'));
  //   console.log(watchedFilms);
  return watchedFilms;
}

function getQueue(data) {
  queue = JSON.parse(localStorage.getItem('queve'));
  //   console.log(queue);
  return queue;
}

getWatchedFilms();
getQueue();

function appendLibraryMarkup(data) {
  refs.library.insertAdjacentHTML('afterbegin', movieTemplate(data));
  getFilm(data);
}

function clearContent() {
  refs.gallery.innerHTML = '';
  refs.library.innerHTML = '';
}
