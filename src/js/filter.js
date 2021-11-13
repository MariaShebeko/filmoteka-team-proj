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
  refs.nowPlayingBtnEl.classList.add('active');
  refs.popularBtnEl.classList.remove('active');
  refs.topRatedBtnEl.classList.remove('active');
  refs.upcomingBtnEl.classList.remove('active');
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
  refs.nowPlayingBtnEl.classList.remove('active');
  refs.popularBtnEl.classList.remove('active');
  refs.topRatedBtnEl.classList.add('active');
  refs.upcomingBtnEl.classList.remove('active');
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
  refs.nowPlayingBtnEl.classList.remove('active');
  refs.popularBtnEl.classList.remove('active');
  refs.topRatedBtnEl.classList.remove('active');
  refs.upcomingBtnEl.classList.add('active');
}

function markup(data) {
  showLoader();
  clearContent();
  appendMoviesMarkup(data.results);
  window.pagination.draw(data);
}
