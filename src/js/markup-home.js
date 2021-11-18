import refs from './refs/refs';
import { getFilm } from './modal-film.js';
import movieTemplate from '../templates/film-card-template.hbs';
import movieTemplateRu from '../templates/film-card-template-russian.hbs';
import { convertingData } from './data-converting-functions.js';
import { showLoader } from './loader.js';
import { onCreateTrailerLink } from './trailer.js';
import { onChangeActiveFilterBtn } from './filter.js';
import { currentLanguage, changeContent } from './languages-switch.js';
export const trendingApiServise = window.ApiService;
const { popularBtnEl, nowPlayingBtnEl, topRatedBtnEl, upcomingBtnEl, gallery, languagesToggleEl } =
  refs;
onLoad();

window.pagination.onPageClicked(function (pageNumber) {
  trendingApiServise.pageNumber = pageNumber;
  onLoad();
});

export function onLoad() {
  showLoader();
  trendingApiServise.fetchMovieGenre().then(toSaveGenres);
  trendingApiServise
    .fetchPopularMovies()
    .then(convertingData)
    .then(data => {
      showLoader();
      clearContent();
      currentLanguage();
      appendMoviesMarkup(data.results);
      window.pagination.draw(data);
      changeContent();
    })
    .catch(error => console.log(error));
  onChangeActiveFilterBtn(popularBtnEl, nowPlayingBtnEl, topRatedBtnEl, upcomingBtnEl);
}

export function appendMoviesMarkup(data) {
  if (!languagesToggleEl.checked) {
    gallery.insertAdjacentHTML('afterbegin', movieTemplate(data));
    onCreateTrailerLink(document.querySelectorAll('.btn-youtube'));
  }
  if (languagesToggleEl.checked) {
    setTimeout(() => {
      gallery.insertAdjacentHTML('afterbegin', movieTemplateRu(data));
      onCreateTrailerLink(document.querySelectorAll('.btn-youtube'));
    }, 1000);
  }
  getFilm(data);
}

export function clearContent() {
  gallery.innerHTML = '';
  trendingApiServise.resetPage();
}

export function toSaveGenres(data) {
  localStorage.setItem('genres', JSON.stringify(data));
}
