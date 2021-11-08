import ApiService from './apiService';
import refs from './refs/refs';
import movieTemplate from '../templates/film-card-template.hbs';

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
