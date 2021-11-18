import refs from './refs/refs.js';
import { onLoad } from './markup-home.js';
import { onMyLibraryBtnClick } from './markup-my-library.js';
import { fetchSearch } from './search-movie.js';

const {
  languagesToggleEl,
  buttonHomeEl,
  buttonLibrary,
  inputField,
  btnWatchedHeaderEl,
  btnQueueHeaderEl,
  gallery,
  popularBtnEl,
  nowPlayingBtnEl,
  topRatedBtnEl,
  upcomingBtnEl,
  emptyTextEl,
} = refs;

// listener on languageToggle
languagesToggleEl.addEventListener('change', changeLanguage);
languagesToggleEl.addEventListener('change', setLanguageInLocalStorage);

function changeLanguage() {
  if (gallery.innerHTML !== '') {
    if (!inputField.value) {
      onLoad();
    } else {
      fetchSearch();
    }
  }
  if (library.innerHTML !== '') {
    onMyLibraryBtnClick();
  }
  changeContent();
}

function setLanguageInLocalStorage() {
  if (languagesToggleEl.checked) {
    localStorage.setItem('language', 'russian');
  } else {
    localStorage.setItem('language', 'english');
  }
  currentLanguage();
}
export function currentLanguage() {
  if (localStorage.getItem('language') === 'russian') {
    languagesToggleEl.checked = true;
  }
}

export function changeContent() {
  const sliderTitle = document.getElementById('slider-title');
  if (languagesToggleEl.checked) {
    buttonHomeEl.textContent = 'Домой';
    buttonLibrary.textContent = 'Библиотека';
    inputField.placeholder = 'Поиск фильмов';
    btnWatchedHeaderEl.textContent = 'Просмотренные';
    btnQueueHeaderEl.textContent = 'В очереди';
    popularBtnEl.textContent = 'Популярные';
    nowPlayingBtnEl.textContent = 'Сейчас смотрят';
    topRatedBtnEl.textContent = 'Топ-рейтинг';
    upcomingBtnEl.textContent = 'Скоро на экране';
    sliderTitle.textContent = 'В тренде';
    emptyTextEl.textContent = 'Этот список пуст';
  } else {
    buttonHomeEl.textContent = 'Home';
    buttonLibrary.textContent = 'My library';
    inputField.placeholder = 'Movies search';
    btnWatchedHeaderEl.textContent = 'Watched';
    btnQueueHeaderEl.textContent = 'Queue';
    popularBtnEl.textContent = 'Popular';
    nowPlayingBtnEl.textContent = 'Now playing';
    topRatedBtnEl.textContent = 'Top rated';
    upcomingBtnEl.textContent = 'Upcoming';
    sliderTitle.textContent = 'Trending movies';
    emptyTextEl.textContent = 'This list is empty';
  }
}
