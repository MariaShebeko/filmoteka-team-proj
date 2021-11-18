import movieTemplate from '../templates/film-card-template.hbs';
import movieTemplateRu from '../templates/film-card-template-russian.hbs';
import { myNotice, myError, myAlert } from './components/pnotify';
import refs from './refs/refs';
import { getFilm } from './modal-film.js';
import { convertingData } from './data-converting-functions.js';
import { showLoader } from './loader.js';
import { onCreateTrailerLink } from './trailer.js';
const { inputField, formEl, filterWrapperEl, gallery, languagesToggleEl } = refs;
const nameOfMovieToSearch = window.ApiService;

function init() {
  nameOfMovieToSearch.query = inputField.value;
  nameOfMovieToSearch.fetchMovieGenre().then(function (data) {
    localStorage.setItem('genres', JSON.stringify(data));
  });
  nameOfMovieToSearch
    .fetchPopularMovies()
    .then(convertingData)
    .then(function (data) {
      showLoader();
      clearContent();
      renderMakrup(data);
      window.pagination.draw(data);
    });
}

formEl.addEventListener('submit', onSearch);
function onSearch(event) {
  event.preventDefault();
  if (!inputField.value) {
    return myNotice();
  }
  if (nameOfMovieToSearch.query === inputField.value) {
    return myAlert();
  }

  window.pagination.onPageClicked(function (pageNumber) {
    nameOfMovieToSearch.pageNumber = pageNumber;
    if (!nameOfMovieToSearch.query) {
      showLoader();
      init();
    } else fetchSearch();
  });

  if (nameOfMovieToSearch.query !== inputField.value) {
    nameOfMovieToSearch.query = inputField.value;
    nameOfMovieToSearch.resetPage();
  }
  fetchSearch();
}

export function fetchSearch() {
  showLoader();
  nameOfMovieToSearch
    .fetchSearchMovies()
    .then(convertingData)
    .then(data => {
      showLoader();
      getFilm(data.results);
      if (data.results.length > 0) {
        clearContent();
        renderMakrup(data);
        window.pagination.draw(data);
      } else {
        return myError();
      }
    })
    .catch(error => console.log(error));
}

function renderMakrup(data) {
  filterWrapperEl.style.display = 'none';

  // gallery.insertAdjacentHTML('beforeend', movieTemplate(data.results));

  if (languagesToggleEl.checked) {
    gallery.insertAdjacentHTML('beforeend', movieTemplateRu(data.results));
    onCreateTrailerLink(document.querySelectorAll('.btn-youtube'));
  } else if (!languagesToggleEl.checked) {
    gallery.insertAdjacentHTML('beforeend', movieTemplate(data.results));
    onCreateTrailerLink(document.querySelectorAll('.btn-youtube'));
  }
  getFilm(data.results);
}

function clearContent() {
  gallery.innerHTML = '';
  nameOfMovieToSearch.resetPage();
}
