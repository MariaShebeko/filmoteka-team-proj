// import ApiService from './apiService';
import refs from './refs/refs';
import movieTemplate from '../templates/film-card-template.hbs';

const trendingApiServise = window.ApiService;

onLoad();

function onLoad() {
  trendingApiServise.fetchMovieGenre().then(toSaveGenres);
  trendingApiServise.fetchPopularMovies().then(appendMoviesMarkup);
}

function appendMoviesMarkup(data) {
  refs.gallery.insertAdjacentHTML('afterbegin', movieTemplate(data.results));
  window.pagination.draw(data);
}

function toSaveGenres(data) {
  localStorage.setItem('genres', JSON.stringify(data));
}
