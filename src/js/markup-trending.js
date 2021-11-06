import ApiService from './apiService';

const refs = {
  gallery: document.querySelector('.film-container'),
};

const trendingApiServise = new ApiService();

function onLoad() {
  trendingApiServise.fetchPopularMovies().then(appendMoviesMarkup);
}

function appendMoviesMarkup() {
  refs.gallery.insertAdjacentHTML('beforeend', moviesTemplate(movies));
}
