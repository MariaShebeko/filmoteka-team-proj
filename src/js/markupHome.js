// import ApiService from './apiService';
import refs from './refs/refs';
import { getFilm } from './modalFilm.js';
import movieTemplate from '../templates/film-card-template.hbs';

const trendingApiServise = window.ApiService;

// const trendingApiServise = new ApiService();

// const pagination = new CustomPagination();
// pagination.onPageClicked(function (pageNumber) {
//   trendingApiServise.pageNumber = pageNumber;
//   trendingApiServise
//     .fetchPopularMovies()
//     .then(toGetShortGenresList)
//     .then(toGetYear)
//     .then(toGetFullGenresList)
//     .then(appendMoviesMarkup);
// });

onLoad();

function onLoad() {
  trendingApiServise.fetchMovieGenre().then(toSaveGenres);
  trendingApiServise
    .fetchPopularMovies()
    .then(toGetShortGenresList)
    .then(toGetYear)
    .then(toGetFullGenresList)
    .then(appendMoviesMarkup);
}

function appendMoviesMarkup(data) {
  refs.gallery.innerHTML = '';
  refs.gallery.insertAdjacentHTML('afterbegin', movieTemplate(data.results));
  getFilm(data.results);
  window.pagination.draw(data);

  // pagination.draw(data);
  // window.scrollTo({ top: 0, behavior: 'smooth' });
}

// saving genges id-list in localStorage
function toSaveGenres(data) {
  localStorage.setItem('genres', JSON.stringify(data));
}

// transforming full date in year in results
function toGetYear(data) {
  data.results.map(item => {
    item.release_year = item.release_date.slice(0, 4);
  });

  data.results.map(item => {
    if (!item.release_date) {
      item.release_year = 'No release year';
    }
  });

  return data;
}

// getting short genres names list from local storage
function toGetShortGenresList(data) {
  const genres = JSON.parse(localStorage.getItem('genres'));
  data.results.map(item => {
    let filmGenres = [];
    genres.find(elem => {
      if (item.genre_ids.includes(elem.id)) {
        filmGenres.push(elem.name);
      }
    });

    if (filmGenres.length <= 3) {
      item.genresShort = filmGenres.join(', ');
    }
    if (filmGenres.length > 3) {
      filmGenres.splice(2, filmGenres.length - 2);
      filmGenres.push('Other');
      item.genresShort = filmGenres.join(', ');
    }
    if (filmGenres.length === 0) {
      filmGenres.push('No genres');
      item.genresShort = filmGenres.join(', ');
    }
  });
  return data;
}

// getting full genres names list from local storage
function toGetFullGenresList(data) {
  const genres = JSON.parse(localStorage.getItem('genres'));
  data.results.map(item => {
    let filmGenresAll = [];
    genres.find(elem => {
      if (item.genre_ids.includes(elem.id)) {
        filmGenresAll.push(elem.name);
      }
    });
    item.genresAll = filmGenresAll;
  });
  return data;
}
