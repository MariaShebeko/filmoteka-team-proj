import refs from './refs/refs';
import { getFilm } from './modalFilm.js';
import movieTemplate from '../templates/film-card-template.hbs';

// let watchedFilms = [];
// let queuedFilms = [];
refs.buttonLibrary.addEventListener('click', onMyLibraryBtnClick);
refs.btnWatchedHeaderEl.addEventListener('click', onBtnWatchedClick);
refs.btnQueueHeaderEl.addEventListener('click', onBtnQueueClick);

function changeMyLibraryHeader() {
  refs.headerEl.classList.replace('header-home', 'header-library');
  refs.libraryBtnListEl.classList.remove('visually-hidden');
  refs.formEl.classList.add('visually-hidden');
  refs.sliderEl.classList.add('visually-hidden')
  refs.buttonHomeEl.classList.remove('nav-list__link_current');
  refs.buttonLibrary.classList.add('nav-list__link_current');
}

function getWatchedFilms() {
  try {
    let watchedFilms = JSON.parse(localStorage.getItem('watched'));
    console.log(watchedFilms);
    return watchedFilms;
  }
  catch (error) {
    console.log(error);
  }
}

function getQueue() {
  try {
    let queuedFilms = JSON.parse(localStorage.getItem('queve'));
    console.log(queuedFilms);
    return queuedFilms;
  } catch (error) {
    console.log(error);
  }
}

// getWatchedFilms();
// getQueue();

function appendLibraryMarkup(data) {
  refs.library.insertAdjacentHTML('afterbegin', movieTemplate(data));
  // refs.library.insertAdjacentHTML('afterbegin', movieTemplate(data));
  // getFilm(data);
}

function onMyLibraryBtnClick() {
  clearContent();
  changeMyLibraryHeader();
  // refs.btnWatchedHeaderEl.classList.add('active');
  // onBtnWathedClick();
}

// function onMyLibraryBtnClick() {
//   clearContent();
//   changeMyLibraryHeader();
//   refs.btnWatchedHeaderEl.classList.add('active');
//   onBtnWathedClick();
// }

function clearContent() {
  refs.gallery.innerHTML = '';
  refs.library.innerHTML = '';
  // refs.sliderEl.innerHTML = '';
  // refs.sliderEl.style.minHeight = '0px';
  refs.paginationEl.innerHTML = '';
}

function onBtnWatchedClick() {
  clearContent();
  console.log('Hi, man');
  appendLibraryMarkup(getWatchedFilms());
}

function onBtnQueueClick() {
  clearContent();
  console.log('Hi, man');
  // appendLibraryMarkup(queuedFilms); 
  appendLibraryMarkup(getQueue())
  // refs.btnWatchedHeaderEl.classList.remove('active');
}
