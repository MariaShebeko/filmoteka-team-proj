import refs from './refs/refs';
import { getFilm } from './modalFilm.js';
import movieTemplate from '../templates/film-card-template.hbs';

export let watchedFilms = [];
export let queuedFilms = [];
refs.buttonLibrary.addEventListener('click', onMyLibraryBtnClick);
refs.btnWatchedHeaderEl.addEventListener('click', onBtnWathedClick);
refs.btnQueueHeaderEl.addEventListener('click', onBtnQueueClick);

export function getWatchedFilms() {
  watchedFilms = JSON.parse(localStorage.getItem('watched'));
  return watchedFilms;
}

export function getQueue() {
  queuedFilms = JSON.parse(localStorage.getItem('queve'));
  return queuedFilms;
}

getWatchedFilms();
getQueue();

export function appendLibraryMarkup(data) {
  refs.library.insertAdjacentHTML('afterbegin', movieTemplate(data));
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
  // refs.sliderEl.innerHTML = '';
  // refs.sliderEl.style.minHeight = '0px';
  refs.sliderEl.style.display = 'none';
  refs.paginationEl.innerHTML = '';
}

export function changeMyLibraryHeader() {
  refs.headerEl.classList.replace('header-home', 'header-library');
  refs.libraryBtnListEl.classList.remove('visually-hidden');
  refs.formEl.classList.add('visually-hidden');
  refs.buttonHomeEl.classList.remove('nav-list__link_current');
  refs.buttonLibrary.classList.add('nav-list__link_current');
}

function onBtnWathedClick() {
  clearContent();
  appendLibraryMarkup(watchedFilms);
  refs.btnWatchedHeaderEl.classList.add('active');
  refs.btnQueueHeaderEl.classList.remove('active');
}

function onBtnQueueClick() {
  clearContent();
  appendLibraryMarkup(queuedFilms);
  refs.btnWatchedHeaderEl.classList.remove('active');
  refs.btnQueueHeaderEl.classList.add('active');
}
