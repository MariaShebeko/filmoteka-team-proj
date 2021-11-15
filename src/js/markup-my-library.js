import refs from './refs/refs';
import movieTemplate from '../templates/film-card-template.hbs';
// import { openModalWindowLibrary } from '../js/components/modal-library-clean';
import CustomPagination from './components/pagination';
import MyLibraryApi from './components/myLibApi';
import { swithPagination } from './components/pagination';
import { onCreateTrailerLink } from './trailer.js';

const libraryApi = new MyLibraryApi();

export const pagination = new CustomPagination(refs.paginationLibEl);
pagination.onPageClicked(pageNumber => {
  // console.log(pageNumber);
  if (refs.library.innerHTML !== '') {
    if (refs.btnWatchedHeaderEl.classList.contains('active')) {
      libraryApi.setWatchedPage(pageNumber);
      getWatchedFilms();
      onBtnWathedClick();
    }
    if (refs.btnQueueHeaderEl.classList.contains('active')) {
      libraryApi.setQueuePage(pageNumber);
      getQueue();
      onBtnQueueClick();
    }
  }
});

export let watchedFilms = [];
export let queuedFilms = [];
refs.buttonLibrary.addEventListener('click', onMyLibraryBtnClick);
refs.btnWatchedHeaderEl.addEventListener('click', onBtnWathedClick);
refs.btnQueueHeaderEl.addEventListener('click', onBtnQueueClick);
// refs.btnCleanLibraryEl.addEventListener('click', onBtnCleanLibraryClick);

export function getWatchedFilms() {
  watchedFilms = libraryApi.getWatchedFilms();
  // watchedFilms = JSON.parse(localStorage.getItem('watched'));
  return watchedFilms;
}

export function getQueue() {
  queuedFilms = libraryApi.getQueueFilms();
  // queuedFilms = JSON.parse(localStorage.getItem('queue'));
  return queuedFilms;
}

getWatchedFilms();
getQueue();

export function appendLibraryMarkup(data) {
  refs.library.insertAdjacentHTML('afterbegin', movieTemplate(data));

  onCreateTrailerLink(document.querySelectorAll('.btn-youtube'));
}

function onMyLibraryBtnClick() {
  swithPagination(2);
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
  appendLibraryMarkup(watchedFilms.results);
  refs.btnWatchedHeaderEl.classList.add('active');
  refs.btnQueueHeaderEl.classList.remove('active');
  // refs.btnCleanLibraryEl.classList.remove('active');
  showEmptyWatched();
  pagination.draw(watchedFilms);
}

function onBtnQueueClick() {
  clearContent();
  appendLibraryMarkup(queuedFilms.results);
  refs.btnWatchedHeaderEl.classList.remove('active');
  refs.btnQueueHeaderEl.classList.add('active');
  showEmptyQueue();
  pagination.draw(queuedFilms);
  // refs.btnCleanLibraryEl.classList.remove('active');
}

function onBtnCleanLibraryClick() {
  refs.btnWatchedHeaderEl.classList.remove('active');
  refs.btnQueueHeaderEl.classList.remove('active');
  // refs.btnCleanLibraryEl.classList.add('active');

  openModalWindowLibrary();
}
const modalLibrary = document.querySelector('.modal-library');

function openModalWindowLibrary() {
  modalLibrary.style.display = 'block';
}

const span = document.querySelector('.close');
span.addEventListener('click', closeModalLibrary);
function closeModalLibrary(event) {
  if (event.target !== modalLibrary) {
    modalLibrary.style.display = 'none';
  }
  modalLibrary.style.display = 'none';
}
// window.onclick = function (event) {
//   if (event.target == modalLibrary) {
//     modalLibrary.style.display = "none";
//   }
// };

export function showEmptyWatched() {
  const watchedShown =
    watchedFilms &&
    watchedFilms.results.length > 0 &&
    refs.btnWatchedHeaderEl.classList.contains('active');
  // console.log(watchedFilms, watchedShown);
  if (!watchedShown) {
    refs.paginationLibEl.classList.add('displayNone');
    refs.emptyTextEl.classList.remove('visually-hidden');
  } else {
    refs.paginationLibEl.classList.remove('displayNone');
    refs.emptyTextEl.classList.add('visually-hidden');
  }
}
export function showEmptyQueue() {
  const queueShown =
    queuedFilms &&
    queuedFilms.results.length > 0 &&
    refs.btnQueueHeaderEl.classList.contains('active');
  if (!queueShown) {
    refs.paginationLibEl.classList.add('displayNone');
    refs.emptyTextEl.classList.remove('visually-hidden');
  } else {
    refs.paginationLibEl.classList.remove('displayNone');
    refs.emptyTextEl.classList.add('visually-hidden');
  }
}
