import refs from './refs/refs';
import { trendingApiServise, onLoad, appendMoviesMarkup, clearContent } from './markupHome';
import { convertingData } from './data-converting-functions.js';
import { showLoader } from './loader.js';

refs.popularBtnEl.addEventListener('click', onLoad);
refs.nowPlayingBtnEl.addEventListener('click', onFetchNowPlayingMovies);
refs.topRatedBtnEl.addEventListener('click', onFetchTopRated);
refs.upcomingBtnEl.addEventListener('click', onFetchUpcoming);

function onFetchNowPlayingMovies() {
  showLoader();
  trendingApiServise
    .fetchNowPlayingMovies()
    .then(convertingData)
    .then(markup)
    .catch(error => console.log(error));
  window.pagination.onPageClicked(function (pageNumber) {
    trendingApiServise.pageNumber = pageNumber;
    onFetchNowPlayingMovies();
  });
}

function onFetchTopRated() {
  showLoader();
  trendingApiServise
    .fetchTopRatedMovies()
    .then(convertingData)
    .then(markup)
    .catch(error => console.log(error));
  window.pagination.onPageClicked(function (pageNumber) {
    trendingApiServise.pageNumber = pageNumber;
    onFetchTopRated();
  });
}

function onFetchUpcoming() {
  showLoader();
  trendingApiServise
    .fetchUpcomingMovies()
    .then(convertingData)
    .then(markup)
    .catch(error => console.log(error));
  window.pagination.onPageClicked(function (pageNumber) {
    trendingApiServise.pageNumber = pageNumber;
    onFetchUpcoming();
  });
}

function markup(data) {
  showLoader();
  clearContent();
  appendMoviesMarkup(data.results);
  window.pagination.draw(data);
}
