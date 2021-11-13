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
import refs from './refs/refs';

refs.popularBtnEl.addEventListener('click', onLoad);
refs.nowPlayingBtnEl.addEventListener('click', onFetchNowPlayingMovies);
refs.topRatedBtnEl.addEventListener('click', onFetchTopRated);
refs.upcomingBtnEl.addEventListener('click', onFetchUpcoming);

function onFetchNowPlayingMovies() {
  trendingApiServise.fetchMovieGenre().then(toSaveGenres);
  trendingApiServise
    .fetchNowPlayingMovies()
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
function onFetchTopRated() {
  trendingApiServise.fetchMovieGenre().then(toSaveGenres);
  trendingApiServise
    .fetchTopRatedMovies()
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
function onFetchUpcoming() {
  trendingApiServise.fetchMovieGenre().then(toSaveGenres);
  trendingApiServise
    .fetchUpcomingMovies()
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
