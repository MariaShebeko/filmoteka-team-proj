import refs from './refs/refs.js';
import { onLoad } from './markup-home.js';

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
  if (gallery.innerHTML !== '') {
    onLoad();
  }

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
    //   добавить футер???, надпись "trending movies"
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
  }
  // Добавить перевод жанров? тогда в data-converting-functions надо еще записывать +
  //   списки жанров на русском, и внести их в film - card - template - russian.hbs +
}
// сделать еще один шаблон для модалки (setTimeout по идее не надо будет) +
// в LocalStorage они попадают уже с нужными данными, добавить отрисовку библиотеки по переключателю +
// добавить отрисовку поиска по переключателю (скорее всего надо будет setTimeout) +

// в библиотеке (перевод не найден), почему
// Кнопки модалки, при открытии меняются, добавить еще замену контента при переключении!!!
// привести переключтель в норм вид (сделала файл в sass) !!!
// название atitle не забыть поменять !!!
