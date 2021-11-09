import refs from './refs/refs';
import imageTemplate from '../templates/modal-film-image.hbs';
import descriptionTemplate from '../templates/modal-film-description.hbs';

const {
  bodyEl,
  galleryEl,
  backdropEl,
  modalFilmEl,
  modalFilmImageEl,
  modalFilmDescriptionEl,
} = refs;

// Open modal-film

function openModalFilm(e) {
  if (e.target.nodeName !== 'IMG') return;
  backdropEl.classList.toggle('is-hidden');
  bodyEl.classList.toggle('backdrop-open');
}

galleryEl.addEventListener('click', openModalFilm);

// Close modal-film

function closeModalFilm(e) {
  if (e.target.dataset.value !== 'close') return;
  backdropEl.classList.toggle('is-hidden');
  bodyEl.classList.toggle('backdrop-open');
}

modalFilmEl.addEventListener('click', closeModalFilm);

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
  dataFilm = arrayFilms.find(el => el.title === titleFilm);
  modalFilmImageEl.innerHTML = '';
  modalFilmDescriptionEl.innerHTML = '';
  modalFilmImageEl.insertAdjacentHTML('afterbegin', imageTemplate(dataFilm));
  modalFilmDescriptionEl.insertAdjacentHTML('afterbegin', descriptionTemplate(dataFilm));
}

galleryEl.addEventListener('click', getTitle);
