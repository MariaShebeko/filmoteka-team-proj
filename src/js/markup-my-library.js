import refs from './refs/refs';
import { getFilm } from './modalFilm.js';
import movieTemplate from '../templates/film-card-template.hbs';

let watchedFilms = [];
let queuedFilms = [];
refs.buttonLibrary.addEventListener('click', onMyLibraryBtnClick);
refs.buttonWatchedEl.addEventListener('click', onBtnWathedClick);
refs.buttonQueveEl.addEventListener('click', onBtnQueueClick);

function getWatchedFilms(data) {
  watchedFilms = JSON.parse(localStorage.getItem('watched'));
  console.log(watchedFilms);
  return watchedFilms;
}

function getQueue(data) {
  queuedFilms = JSON.parse(localStorage.getItem('queve'));
  console.log(queuedFilms);
  return queuedFilms;
}

getWatchedFilms();
getQueue();

function appendLibraryMarkup(data) {
  refs.library.insertAdjacentHTML('afterbegin', movieTemplate(data));
  getFilm(data);
}

function onMyLibraryBtnClick() {
  clearContent();
  changeMyLibraryHeader();
}

function clearContent() {
  refs.gallery.innerHTML = '';
  refs.library.innerHTML = '';
  refs.sliderEl.innerHTML = '';
  refs.paginationEl.innerHTML = '';
}

function changeMyLibraryHeader() {
  refs.headerEl.classList.remove('header-home');
  refs.headerEl.classList.add('header-library');
  refs.libraryBtnListEl.classList.remove('visually-hidden');
  refs.formEl.classList.add('visually-hidden');
}

function onBtnWathedClick() {
  console.log('click watched');
  clearContent();
  appendLibraryMarkup(watchedFilms);
}

function onBtnQueueClick() {
  console.log('click queue');
  clearContent();
  appendLibraryMarkup(queuedFilms);
}
