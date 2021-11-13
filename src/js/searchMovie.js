'use strict';
// import ApiService from './apiService';
import movieTemplate from '../templates/film-card-template.hbs';
import { myNotice, myError, myAlert } from './components/pnotify';
import refs from './refs/refs';
import { getFilm } from './modalFilm.js';
import { convertingData } from './data-converting-functions.js';
import { showLoader } from './loader.js';

const nameOfMovieToSearch = window.ApiService;

window.pagination.onPageClicked(function (pageNumber) {
  nameOfMovieToSearch.pageNumber = pageNumber;
  if (!nameOfMovieToSearch.query) {
    showLoader();
    init();
  } else fetchSearch();
});

function init() {
  nameOfMovieToSearch.query = refs.inputField.value;
  nameOfMovieToSearch.fetchMovieGenre().then(function (data) {
    localStorage.setItem('genres', JSON.stringify(data));
  });
  nameOfMovieToSearch
    .fetchPopularMovies()
    .then(convertingData)
    .then(function (data) {
      showLoader();
      clearContent();
      renderMakrup(data.results);
      getFilm(data.results);
      window.pagination.draw(data);
    });
}

refs.formEl.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  if (!refs.inputField.value) {
    return myNotice();
  }
  if (nameOfMovieToSearch.query === refs.inputField.value) {
    return myAlert();
  }

  //===выполненеие чтения и поиска нового названия===
  if (nameOfMovieToSearch.query !== refs.inputField.value) {
    nameOfMovieToSearch.query = refs.inputField.value;
    nameOfMovieToSearch.resetPage();
  }

  fetchSearch();
}

function fetchSearch() {
  showLoader();
  nameOfMovieToSearch
    .fetchSearchMovies()
    .then(convertingData)
    .then(data => {
      showLoader();
      getFilm(data.results);
      if (data.results.length > 0) {
        clearContent();
        renderMakrup(data.results);
        window.pagination.draw(data);
      } else {
        return myError();
      }
    })
    .catch(error => console.log(error));

  //==adding search result to the localStorage==
  // nameOfMovieToSearch
  //   .fetchSearchMovies()
  //   .then(result => {
  //     localStorage.setItem('searchResult', JSON.stringify(result));
  //   })
  //   .catch(error => console.log(error));
}

function renderMakrup(results) {
  refs.gallery.insertAdjacentHTML('beforeend', movieTemplate(results));
}

function clearContent() {
  //==очистка содержимого страницы перед выведением результатов поиска и сброс страницы на 1===
  refs.gallery.innerHTML = '';
  nameOfMovieToSearch.resetPage();
  // localStorage.clear('searchResult');
}
