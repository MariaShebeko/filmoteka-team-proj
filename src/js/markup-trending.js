import ApiService from './apiService';
import movieTemplate from '../templates/film-card-template.hbs';

const refs = {
  gallery: document.querySelector('.gallery_trending'),
};

const trendingApiServise = new ApiService();
console.log(trendingApiServise.fetchPopularMovies());

onLoad();

function onLoad() {
  trendingApiServise.fetchPopularMovies().then(appendMoviesMarkup);
}

function appendMoviesMarkup(results) {
  refs.gallery.insertAdjacentHTML('afterbegin', movieTemplate(results));
}
