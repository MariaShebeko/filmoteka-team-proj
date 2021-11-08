import ApiService from './apiService';
import movieTemplate from '../templates/film-card-template.hbs';
import refs from './refs/refs';

const trendingApiServise = new ApiService();

onLoad();

function onLoad() {
  trendingApiServise.fetchMovieGenre().then(toSaveGenres);
  trendingApiServise.fetchPopularMovies().then(appendMoviesMarkup);
}

function appendMoviesMarkup(results) {
  refs.gallery.insertAdjacentHTML('afterbegin', movieTemplate(results));
}

function toSaveGenres(data) {
  localStorage.setItem('genres', JSON.stringify(data));
}
