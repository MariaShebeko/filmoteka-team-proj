import refs from './refs/refs';
import { trendingApiServise, onLoad, appendMoviesMarkup, clearContent } from './markupHome';
import { convertingData } from './data-converting-functions.js';
import { showLoader } from './loader.js';

const { popularBtnEl, nowPlayingBtnEl, topRatedBtnEl, upcomingBtnEl } = refs;

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
  onChangeActiveFilterBtn(nowPlayingBtnEl, topRatedBtnEl, upcomingBtnEl, popularBtnEl);
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
  onChangeActiveFilterBtn(topRatedBtnEl, upcomingBtnEl, popularBtnEl, nowPlayingBtnEl);
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
  onChangeActiveFilterBtn(upcomingBtnEl, popularBtnEl, nowPlayingBtnEl, topRatedBtnEl);
}

function markup(data) {
  showLoader();
  clearContent();
  appendMoviesMarkup(data.results);
  window.pagination.draw(data);
}

export function onChangeActiveFilterBtn(active, inactive1, inactive2, inactive3) {
  active.classList.add('active');
  inactive1.classList.remove('active');
  inactive2.classList.remove('active');
  inactive3.classList.remove('active');
}
