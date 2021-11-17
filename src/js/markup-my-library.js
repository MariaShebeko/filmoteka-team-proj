import refs from './refs/refs';
import movieTemplate from '../templates/film-card-template.hbs';
import movieTemplateRu from '../templates/film-card-template-russian.hbs';
import CustomPagination from './components/pagination.js';
import MyLibraryApi from './components/my-lib-api.js';
import { swithPagination } from './components/pagination.js';
import { onCreateTrailerLink } from './trailer.js';

const {
  paginationLibEl,
  library,
  gallery,
  btnWatchedHeaderEl,
  btnQueueHeaderEl,
  buttonLibrary,
  sliderEl,
  filterWrapperEl,
  paginationEl,
  headerEl,
  libraryBtnListEl,
  formEl,
  buttonHomeEl,
  emptyTextEl,
  languagesToggleEl,
} = refs;

const libraryApi = new MyLibraryApi();

export const pagination = new CustomPagination(paginationLibEl);
pagination.onPageClicked(pageNumber => {
  if (library.innerHTML !== '') {
    if (btnWatchedHeaderEl.classList.contains('active')) {
      libraryApi.setWatchedPage(pageNumber);
      getWatchedFilms();
      onBtnWathedClick();
    }
    if (btnQueueHeaderEl.classList.contains('active')) {
      libraryApi.setQueuePage(pageNumber);
      getQueue();
      onBtnQueueClick();
    }
  }
});

export let watchedFilms = [];
export let queuedFilms = [];
buttonLibrary.addEventListener('click', onMyLibraryBtnClick);
btnWatchedHeaderEl.addEventListener('click', onBtnWathedClick);
btnQueueHeaderEl.addEventListener('click', onBtnQueueClick);

export function getWatchedFilms() {
  return (watchedFilms = libraryApi.getWatchedFilms());
}

export function getQueue() {
  return (queuedFilms = libraryApi.getQueueFilms());
}

getWatchedFilms();
getQueue();

export function appendLibraryMarkup(data) {
  if (!languagesToggleEl.checked) library.insertAdjacentHTML('afterbegin', movieTemplate(data));
  if (languagesToggleEl.checked) {
    setTimeout(() => {
      library.insertAdjacentHTML('afterbegin', movieTemplateRu(data));
    }, 200);
  }

  onCreateTrailerLink(document.querySelectorAll('.btn-youtube'));
}

export function onMyLibraryBtnClick() {
  swithPagination(2);
  clearContent();
  changeMyLibraryHeader();
  btnWatchedHeaderEl.classList.add('active');
  onBtnWathedClick();
  showEmptyWatched();
}

function clearContent() {
  gallery.innerHTML = '';
  library.innerHTML = '';
  sliderEl.style.display = 'none';
  filterWrapperEl.style.display = 'none';
  paginationEl.innerHTML = '';
}

export function changeMyLibraryHeader() {
  headerEl.classList.replace('header-home', 'header-library');
  libraryBtnListEl.classList.remove('visually-hidden');
  formEl.classList.add('visually-hidden');
  buttonHomeEl.classList.remove('nav-list__link_current');
  buttonLibrary.classList.add('nav-list__link_current');
}

export function onBtnWathedClick() {
  clearContent();
  appendLibraryMarkup(watchedFilms.results);
  btnWatchedHeaderEl.classList.add('active');
  btnQueueHeaderEl.classList.remove('active');
  showEmptyWatched();
  pagination.draw(watchedFilms);
}

function onBtnQueueClick() {
  clearContent();
  appendLibraryMarkup(queuedFilms.results);
  btnWatchedHeaderEl.classList.remove('active');
  btnQueueHeaderEl.classList.add('active');
  showEmptyQueue();
  pagination.draw(queuedFilms);
}

export function showEmptyWatched() {
  const watchedShown =
    watchedFilms &&
    watchedFilms.results.length > 0 &&
    btnWatchedHeaderEl.classList.contains('active');
  if (!watchedShown) {
    paginationLibEl.classList.add('displayNone');
    emptyTextEl.classList.remove('visually-hidden');
  } else {
    paginationLibEl.classList.remove('displayNone');
    emptyTextEl.classList.add('visually-hidden');
  }
}
export function showEmptyQueue() {
  const queueShown =
    queuedFilms && queuedFilms.results.length > 0 && btnQueueHeaderEl.classList.contains('active');
  if (!queueShown) {
    paginationLibEl.classList.add('displayNone');
    emptyTextEl.classList.remove('visually-hidden');
  } else {
    paginationLibEl.classList.remove('displayNone');
    emptyTextEl.classList.add('visually-hidden');
  }
}
