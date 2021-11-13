import refs from './refs/refs';

import {
  trendingApiServise,
  onLoad,
  appendMoviesMarkup,
  clearContent,
  toSaveGenres,
} from './markupHome';
import { toGetShortGenresList } from './data-converting-functions.js';
import { toGetFullGenresList } from './data-converting-functions.js';
import { toGetYear } from './data-converting-functions.js';
import { showLoader } from './loader.js';

refs.popularBtnEl.addEventListener('click', onLoad);
refs.nowPlayingBtnEl.addEventListener('click', onFetchNowPlayingMovies);
refs.topRatedBtnEl.addEventListener('click', onFetchTopRated);
refs.upcomingBtnEl.addEventListener('click', onFetchUpcoming);

function onFetchNowPlayingMovies() {
  showLoader();
  trendingApiServise.fetchMovieGenre().then(toSaveGenres);
  trendingApiServise
    .fetchNowPlayingMovies()
    .then(toGetYear)
    .then(toGetShortGenresList)
    .then(toGetFullGenresList)
    .then(data => {
      showLoader();
      clearContent();
      appendMoviesMarkup(data.results);
      window.pagination.draw(data);
    })
    .catch(error => console.log(error));
}
function onFetchTopRated() {
  showLoader();
  trendingApiServise.fetchMovieGenre().then(toSaveGenres);
  trendingApiServise
    .fetchTopRatedMovies()
    .then(toGetYear)
    .then(toGetShortGenresList)
    .then(toGetFullGenresList)
    .then(data => {
      showLoader();
      clearContent();
      appendMoviesMarkup(data.results);
      window.pagination.draw(data);
    })
    .catch(error => console.log(error));
}
function onFetchUpcoming() {
  showLoader();
  trendingApiServise.fetchMovieGenre().then(toSaveGenres);
  trendingApiServise
    .fetchUpcomingMovies()
    .then(toGetYear)
    .then(toGetShortGenresList)
    .then(toGetFullGenresList)
    .then(data => {
      showLoader();
      clearContent();
      appendMoviesMarkup(data.results);
      window.pagination.draw(data);
    })
    .catch(error => console.log(error));
}
