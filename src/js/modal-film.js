import refs from './refs/refs';
import modalImageTemplate from '../templates/modal-film-image.hbs';
import modalDescriptionTemplate from '../templates/modal-film-description.hbs';
import {
  getWatchedFilms,
  getQueue,
  appendLibraryMarkup,
  watchedFilms,
  queuedFilms,
  showEmptyWatched,
  showEmptyQueue,
} from './markup-my-library.js';

const {
  bodyEl,
  galleryEl,
  backdropEl,
  modalFilmEl,
  modalFilmImageEl,
  modalFilmDescriptionEl,
  buttonWatchedEl,
  buttonQueueEl,
  library,
  btnWatchedHeaderEl,
  btnQueueHeaderEl,
} = refs;

// Open modal

function openModalFilm(e) {
  if (e.target.nodeName !== 'IMG') return;
  backdropEl.classList.toggle('is-hidden');
  bodyEl.classList.toggle('backdrop-open');
  window.addEventListener('keydown', setKeyListener);
  backdropEl.addEventListener('click', setBackdropListener);
}

galleryEl.addEventListener('click', openModalFilm);

// Close modal

function closeModalFilm() {
  backdropEl.classList.toggle('is-hidden');
  bodyEl.classList.toggle('backdrop-open');
  window.removeEventListener('keydown', setKeyListener);
  backdropEl.removeEventListener('click', setBackdropListener);
  fnLibrary();
}

modalFilmEl.addEventListener('click', e => {
  if (e.target.dataset.value !== 'close') return;
  closeModalFilm();
});

function setKeyListener(e) {
  if (e.key === 'Escape') closeModalFilm();
}

function setBackdropListener(e) {
  if (!e.target.classList.contains('backdrop')) return;
  closeModalFilm();
}

// Markup film

let arrayFilms;
export let dataFilm;

export function getFilm(data) {
  arrayFilms = data;
}

function getTitle(e) {
  if (e.target.nodeName !== 'IMG') return;
  markupFilm(e.target.alt);
}

galleryEl.addEventListener('click', getTitle);

function markupFilm(titleFilm) {
  dataFilm = arrayFilms.find(
    el => el.original_title === titleFilm || el.original_name === titleFilm,
  );
  chekLocalStorage(dataFilm, 'watched', 'WATCHED', buttonWatchedEl);
  chekLocalStorage(dataFilm, 'queue', 'QUEUE', buttonQueueEl);
  modalFilmImageEl.innerHTML = '';
  modalFilmDescriptionEl.innerHTML = '';
  modalFilmImageEl.insertAdjacentHTML('afterbegin', modalImageTemplate(dataFilm));
  modalFilmDescriptionEl.insertAdjacentHTML('afterbegin', modalDescriptionTemplate(dataFilm));
}

// ChekLocal

function chekLocalStorage(dataFilm, keyLocal, nameBtn, refEl) {
  if (
    localStorage.getItem(keyLocal) &&
    JSON.parse(localStorage.getItem(keyLocal)).some(el => el.title === dataFilm.title)
  ) {
    refEl.textContent = `REMOVE FROM ${nameBtn}`;
  } else {
    refEl.textContent = `ADD TO ${nameBtn}`;
  }
  return;
}

function fnLibrary() {
  getWatchedFilms();
  getQueue();
  if (refs.gallery.innerHTML === '') {
    updateLibrary('watched', library, watchedFilms);
    updateLibrary('queue', library, queuedFilms);
  }
  if (refs.library.innerHTML !== '') {
    if (btnWatchedHeaderEl.classList.contains('active')) {
      updateLibrary('watched', library, watchedFilms);
    }
    if (btnQueueHeaderEl.classList.contains('active')) {
      updateLibrary('queue', library, queuedFilms);
    }
  }
  if (refs.gallery.innerHTML !== '') {
    return;
  } else if (refs.library.innerHTML === '') {
    showEmptyWatched();
    showEmptyQueue();
  }
}

function updateLibrary(keyLocal, refEl, arrayFilms) {
  if (JSON.parse(localStorage.getItem(keyLocal)).length === 0) {
    refEl.innerHTML = '';
  } else {
    refEl.innerHTML = '';
    appendLibraryMarkup(arrayFilms);
  }
}
