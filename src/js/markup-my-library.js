import refs from './refs/refs';
import { getFilm } from './modalFilm.js';
import movieTemplate from '../templates/film-card-template.hbs';
// import { openModalWindowLibrary } from '../js/components/modal-library-clean';


export let watchedFilms = [];
export let queuedFilms = [];
refs.buttonLibrary.addEventListener('click', onMyLibraryBtnClick);
refs.btnWatchedHeaderEl.addEventListener('click', onBtnWathedClick);
refs.btnQueueHeaderEl.addEventListener('click', onBtnQueueClick);
refs.btnCleanLibraryEl.addEventListener('click', onBtnCleanLibraryClick);

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
  showEmptyWatched();
}

function clearContent() {
  refs.gallery.innerHTML = '';
  refs.library.innerHTML = '';
  // refs.sliderEl.innerHTML = '';
  // refs.sliderEl.style.minHeight = '0px';
  refs.sliderEl.style.display = 'none';
  refs.filterWrapperEl.style.display = 'none';
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
  refs.btnCleanLibraryEl.classList.remove('active');
  showEmptyWatched();
}

function onBtnQueueClick() {
  clearContent();
  appendLibraryMarkup(queuedFilms);
  refs.btnWatchedHeaderEl.classList.remove('active');
  refs.btnQueueHeaderEl.classList.add('active');
  showEmptyQueue();
  refs.btnCleanLibraryEl.classList.remove('active');
}

function onBtnCleanLibraryClick() {
  refs.btnWatchedHeaderEl.classList.remove('active');
  refs.btnQueueHeaderEl.classList.remove('active');
  refs.btnCleanLibraryEl.classList.add('active')

  openModalWindowLibrary();
}
const modalLibrary = document.querySelector('.modal-library');

function openModalWindowLibrary() {
  // alert('hi');
  // console.dir(modalLibrary);
  modalLibrary.style.display = "block";
}

const span = document.querySelector('.close');
span.addEventListener('click', closeModalLibrary);
function closeModalLibrary() {
  modalLibrary.style.display = "none";
}

export function showEmptyWatched() {
  const watchedShown =
    watchedFilms && watchedFilms.length > 0 && refs.btnWatchedHeaderEl.classList.contains('active');
  if (!watchedShown) {
    refs.emptyTextEl.classList.remove('visually-hidden');
  } else {
    refs.emptyTextEl.classList.add('visually-hidden');
  }
}
export function showEmptyQueue() {
  const queueShown =
    queuedFilms && queuedFilms.length > 0 && refs.btnQueueHeaderEl.classList.contains('active');
  if (!queueShown) {
    refs.emptyTextEl.classList.remove('visually-hidden');
  } else {
    refs.emptyTextEl.classList.add('visually-hidden');
  }
}
