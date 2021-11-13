import refs from './refs/refs';
import imageTemplate from '../templates/modal-film-image.hbs';
import descriptionTemplate from '../templates/modal-film-description.hbs';
import {
  getWatchedFilms,
  getQueue,
  appendLibraryMarkup,
  watchedFilms,
  queuedFilms,
  showEmptyWatched,
  showEmptyQueue,
} from '../js/markup-my-library.js';

const {
  bodyEl,
  galleryEl,
  backdropEl,
  modalFilmEl,
  modalFilmImageEl,
  modalFilmDescriptionEl,
  buttonWatchedEl,
  buttonQueveEl,
  library,
  btnWatchedHeaderEl,
  btnQueueHeaderEl,
} = refs;

// Open modal-film

function openModalFilm(e) {
  if (e.target.nodeName !== 'IMG') return;
  backdropEl.classList.toggle('is-hidden');
  bodyEl.classList.toggle('backdrop-open');
  window.addEventListener('keydown', keyListener);
  backdropEl.addEventListener('click', backdropListener);
}

galleryEl.addEventListener('click', openModalFilm);

// Close modal-film

function closeModalFilm() {
  backdropEl.classList.toggle('is-hidden');
  bodyEl.classList.toggle('backdrop-open');
  window.removeEventListener('keydown', keyListener);
  backdropEl.removeEventListener('click', backdropListener);
  getWatchedFilms();
  getQueue();
  if (refs.gallery.innerHTML === '') {
    updateWatchedLibrary();
    updateQueuedLibrary();
  }
  if (refs.library.innerHTML !== '') {
    if (btnWatchedHeaderEl.classList.contains('active')) {
      updateWatchedLibrary();
    }
    if (btnQueueHeaderEl.classList.contains('active')) {
      updateQueuedLibrary();
    }
  }
  if (refs.gallery.innerHTML !== '') {
    return;
  } else if (refs.library.innerHTML === '') {
    showEmptyWatched();
    showEmptyQueue();
  }
}

modalFilmEl.addEventListener('click', e => {
  if (e.target.dataset.value !== 'close') return;
  closeModalFilm();
});

function keyListener(e) {
  if (e.key === 'Escape') closeModalFilm();
}

function backdropListener(e) {
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

function markupFilm(titleFilm) {
  dataFilm = arrayFilms.find(
    el => el.original_title === titleFilm || el.original_name === titleFilm,
  );
  chekLocalWatched(dataFilm);
  chekLocalQueve(dataFilm);
  modalFilmImageEl.innerHTML = '';
  modalFilmDescriptionEl.innerHTML = '';
  modalFilmImageEl.insertAdjacentHTML('afterbegin', imageTemplate(dataFilm));
  modalFilmDescriptionEl.insertAdjacentHTML('afterbegin', descriptionTemplate(dataFilm));
}

// ChekLocal

function chekLocalWatched(dataFilm) {
  if (
    localStorage.getItem('watched') &&
    JSON.parse(localStorage.getItem('watched')).some(el => el.title === dataFilm.title)
  ) {
    buttonWatchedEl.textContent = 'REMOVE';
  } else {
    buttonWatchedEl.textContent = 'ADD TO WATCHED';
  }
  return;
}

function chekLocalQueve(dataFilm) {
  if (
    localStorage.getItem('queve') &&
    JSON.parse(localStorage.getItem('queve')).some(el => el.title === dataFilm.title)
  ) {
    buttonQueveEl.textContent = 'REMOVE';
  } else {
    buttonQueveEl.textContent = 'ADD TO QUEVE';
  }
  return;
}

function updateWatchedLibrary() {
  if (JSON.parse(localStorage.getItem('watched')).length === 0) {
    library.innerHTML = '';
  } else {
    library.innerHTML = '';
    appendLibraryMarkup(watchedFilms);
  }
}

function updateQueuedLibrary() {
  if (JSON.parse(localStorage.getItem('queve')).length === 0) {
    library.innerHTML = '';
  } else {
    library.innerHTML = '';
    appendLibraryMarkup(queuedFilms);
  }
}

galleryEl.addEventListener('click', getTitle);
