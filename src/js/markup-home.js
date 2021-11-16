import refs from './refs/refs';
import { getFilm } from './modal-film.js';
import movieTemplate from '../templates/film-card-template.hbs';
import movieTemplateRu from '../templates/film-card-template-russian.hbs';
import { convertingData } from './data-converting-functions.js';
import { showLoader } from './loader.js';
import { onCreateTrailerLink } from './trailer.js';
import { onChangeActiveFilterBtn } from './filter.js';
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
  // trendingApiServise.getLanguages()
  trendingApiServise
    .fetchPopularMovies()
    .then(convertingData)
    .then(data => {
      console.log(data);
      showLoader();
      clearContent();

      appendMoviesMarkup(data.results);
      window.pagination.draw(data);
    })
    .catch(error => console.log(error));
  onChangeActiveFilterBtn(popularBtnEl, nowPlayingBtnEl, topRatedBtnEl, upcomingBtnEl);
}

// listener on languageToggle
languagesToggleEl.addEventListener('change', onLoad);

export function appendMoviesMarkup(data) {
  console.dir(languagesToggleEl.checked);

  if (!languagesToggleEl.checked) gallery.insertAdjacentHTML('afterbegin', movieTemplate(data));
  if (languagesToggleEl.checked) gallery.insertAdjacentHTML('afterbegin', movieTemplateRu(data));
  getFilm(data);
  onCreateTrailerLink(document.querySelectorAll('.btn-youtube'));
}

export function clearContent() {
  gallery.innerHTML = '';
  trendingApiServise.resetPage();
}

export function toSaveGenres(data) {
  localStorage.setItem('genres', JSON.stringify(data));
}
