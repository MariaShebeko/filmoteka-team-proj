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
    nameOfMovieToSearch.query = refs.inputField.value;
  }
  // console.log(nameOfMovieToSearch.query);
  // console.dir(nameOfMovieToSearch.fetchSearchMovies());

  nameOfMovieToSearch.fetchSearchMovies().
    then(result => {
      if (result.length > 0) {
        // console.dir(result);
        // console.log(result.length);
        clearContent();
        renderMakrup(result);
      }
      else { return myError(); }
    }).
    catch(error => console.log(error));

  //==adding search result to the localStorage==
  nameOfMovieToSearch.fetchSearchMovies().then(result => {
    localStorage.setItem('searchResult', JSON.stringify(result));
  }).catch(error => console.log(error));
}

function renderMakrup(results) {
  refs.gallery.insertAdjacentHTML('beforeend', movieTemplate(results));
}

function clearContent() {
  //==очистка содержимого страницы перед выведением результатов поиска===
  refs.gallery.innerHTML = '';
  nameOfMovieToSearch.resetPage;
  localStorage.clear('searchResult');
}

