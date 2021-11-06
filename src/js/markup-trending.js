import ApiService from './apiService';
import movieTemplate from '../templates/film-card-template.hbs';

const refs = {
  gallery: document.querySelector('.film-container'),
};

const trendingApiServise = new ApiService();

onLoad();

function onLoad() {
  trendingApiServise.fetchPopularMovies().then(appendMoviesMarkup);
}

function appendMoviesMarkup() {
  refs.gallery.insertAdjacentHTML('beforeend', movieTemplate(results));
}
