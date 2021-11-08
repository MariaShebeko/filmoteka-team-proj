import refs from './refs/refs';
import ApiService from './apiService';
import modalFilmTemplate from '../templates/modal-film.hbs';

const { bodyEl, galleryEl, backdropEl, modalFilmEl, modalFilmWrapperEl } = refs;

const trendingApiServise1 = new ApiService();

// !Modal-film
// Open modal-film

function openModalFilm(e) {
  if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'P') return;
  backdropEl.classList.toggle('is-hidden');
  bodyEl.classList.toggle('backdrop-open');
}

galleryEl.addEventListener('click', openModalFilm);

// Close modal-film

function closeModalFilm(e) {
  if (e.target.nodeName !== 'use' && e.target.nodeName !== 'svg') return;
  backdropEl.classList.toggle('is-hidden');
  bodyEl.classList.toggle('backdrop-open');
}

modalFilmEl.addEventListener('click', closeModalFilm);

// Markup film

const arrayWatched = [];
const arrayQueue = [];

function getTitle(e) {
  if (e.target.nodeName !== 'IMG') return;
  getFilm(e.target.alt);
}

let array;

function getFilm(titleFilm) {
  if (!array) {
    trendingApiServise1.fetchPopularMovies().then(data => {
      array = data;
      markupFilm(data.find(el => el.title === titleFilm));
    });
  } else {
    markupFilm(array.find(el => el.title === titleFilm));
  }
}

function markupFilm(data) {
  modalFilmWrapperEl.innerHTML = '';
  modalFilmWrapperEl.insertAdjacentHTML('afterbegin', modalFilmTemplate(data));
}

galleryEl.addEventListener('click', getTitle);
