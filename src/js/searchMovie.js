'use strict';

import ApiService from './apiService';
import movieTemplate from '../templates/film-card-template.hbs';
import { myNotice, myError, myAlert } from './components/pnotify';
import refs from './refs/refs';

const nameOfMovieToSearch = new ApiService();

refs.formEl.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  if (!refs.inputField.value) {
    return myNotice();
  }

  if (nameOfMovieToSearch.query === refs.inputField.value) {
    return myAlert();
  }

  //===выполненеие поиска нового названия===
  if (nameOfMovieToSearch.query !== refs.inputField.value) {
    clearContent();
    nameOfMovieToSearch.query = refs.inputField.value;
  }
  // console.log(nameOfMovieToSearch.fetchSearchMovies());

  nameOfMovieToSearch.fetchSearchMovies().then(renderMakrup);

  //==adding search result to the localStorage==
  nameOfMovieToSearch.fetchSearchMovies().then(result => {
    localStorage.setItem('searchResult', JSON.stringify(result));
  });
}

function renderMakrup(name) {
  refs.gallery.insertAdjacentHTML('beforeend', movieTemplate(name));
}

function clearContent() {
  //==очистка содержимого страницы перед выведением результатов поиска===
  refs.gallery.innerHTML = '';
  nameOfMovieToSearch.resetPage;
  localStorage.clear('searchResult');
}
