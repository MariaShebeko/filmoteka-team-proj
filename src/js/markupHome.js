// import ApiService from './apiService';
import refs from './refs/refs';
import { getFilm } from './modalFilm.js';
import movieTemplate from '../templates/film-card-template.hbs';
import { toGetShortGenresList } from './data-converting-functions.js';
import { toGetFullGenresList } from './data-converting-functions.js';
import { toGetYear } from './data-converting-functions.js';

export const trendingApiServise = window.ApiService;

onLoad();

window.pagination.onPageClicked(function (pageNumber) {
  trendingApiServise.pageNumber = pageNumber;
  onLoad();
});

export function onLoad() {
  trendingApiServise.fetchMovieGenre().then(toSaveGenres);
  trendingApiServise
    .fetchPopularMovies()
    .then(toGetYear)
    .then(toGetShortGenresList)
    .then(toGetFullGenresList)
    .then(data => {
      clearContent();
      appendMoviesMarkup(data.results);
      window.pagination.draw(data);
    })
    .catch(error => console.log(error));
}

export function appendMoviesMarkup(data) {
  refs.gallery.insertAdjacentHTML('afterbegin', movieTemplate(data));
  getFilm(data);

  // pagination.draw(data);
  // window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function clearContent() {
  refs.gallery.innerHTML = '';
  trendingApiServise.resetPage();
}
// saving genges id-list in localStorage
export function toSaveGenres(data) {
  localStorage.setItem('genres', JSON.stringify(data));
}

// const trendingApiServise = new ApiService();

// const pagination = new CustomPagination();
// pagination.onPageClicked(function (pageNumber) {
//   trendingApiServise.pageNumber = pageNumber;
//   trendingApiServise
//     .fetchPopularMovies()
//     .then(toGetShortGenresList)
//     .then(toGetYear)
//     .then(toGetFullGenresList)
//     .then(appendMoviesMarkup);
// });
