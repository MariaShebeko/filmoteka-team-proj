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
} = refs;
// listener on languageToggle
languagesToggleEl.addEventListener('change', changeLanduage);

function changeLanduage() {
  if (gallery.innerHTML !== '' && gallery.classList.contains('rendered')) {
    if (!inputField.value) {
      onLoad();
    } else {
      fetchSearch();
    }
  }
  if (library.innerHTML !== '') {
    onMyLibraryBtnClick();
  }

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
    //   добавить футер???
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
  }
}

// Кнопки модалки, при открытии меняются, добавить еще замену контента при переключении!!!
// привести переключтель в норм вид (сделала файл в sass) !!!
// название atitle не забыть поменять
