import refs from './refs/refs';
import { getFilm } from './modalFilm.js';
import movieTemplate from '../templates/film-card-template.hbs';

let watchedFilms = [];
let queuedFilms = [];
refs.buttonLibrary.addEventListener('click', onMyLibraryBtnClick);
refs.btnWatchedHeaderEl.addEventListener('click', onBtnWathedClick);
refs.btnQueueHeaderEl.addEventListener('click', onBtnQueueClick);

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
  refs.btnWatchedHeaderEl.classList.add('active');
  onBtnWathedClick();
}

function clearContent() {
  refs.gallery.innerHTML = '';
  refs.library.innerHTML = '';
  refs.sliderEl.innerHTML = '';
  refs.sliderEl.style.minHeight = '0px';
  refs.paginationEl.innerHTML = '';
}

function changeMyLibraryHeader() {
  refs.headerEl.classList.replace('header-home', 'header-library');
  refs.libraryBtnListEl.classList.remove('visually-hidden');
  refs.formEl.classList.add('visually-hidden');
  refs.buttonHomeEl.classList.remove('nav-list__link_current');
  refs.buttonLibrary.classList.add('nav-list__link_current');
}

function onBtnWathedClick() {
  clearContent();
  appendLibraryMarkup(watchedFilms);
}

function onBtnQueueClick() {
  clearContent();
  appendLibraryMarkup(queuedFilms);
  refs.btnWatchedHeaderEl.classList.remove('active');
}
