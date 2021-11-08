import ApiService from './apiService';
import movieTemplate from '../templates/film-card-template.hbs';
// import CustomPagination from '../js/components/pagination';

const refs = {
  gallery: document.querySelector('.gallery_trending'),
};

const trendingApiServise = new ApiService();

// const pagination = new CustomPagination();
// pagination.onPageClicked(function (pageNumber) {
//   trendingApiServise.pageNumber = pageNumber;
//   trendingApiServise.fetchPopularMovies().then(appendMoviesMarkup);
// });

onLoad();

function onLoad() {
  trendingApiServise.fetchMovieGenre().then(toSaveGenres);
  trendingApiServise.fetchPopularMovies().then(appendMoviesMarkup);
}

function appendMoviesMarkup(data) {
  refs.gallery.insertAdjacentHTML('afterbegin', movieTemplate(data.results));
  // pagination.draw(data);
}

function toSaveGenres(data) {
  localStorage.setItem('genres', JSON.stringify(data));
}
