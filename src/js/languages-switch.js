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

    //   добавить кнопки фильтров, футер???, надпись "trending movies"
  } else {
    buttonHomeEl.textContent = 'Home';
    buttonLibrary.textContent = 'My library';
    inputField.placeholder = 'Movies search';
    btnWatchedHeaderEl.textContent = 'Watched';
    btnQueueHeaderEl.textContent = 'Queue';
  }

  // Добавить перевод жанров? тогда в data-converting-functions надо еще записывать
  //   списки жанров на русском, и внести их в film - card - template - russian.hbs
}

// сделать еще один шаблон для модалки (setTimeout по идее не надо будет)

// название atitle не забыть поменять

// в LocalStorage они попадают уже с нужными данными, добавить отрисовку библиотеки по переключателю

// добавить отрисовку поиска по переключателю (скорее всего надо будет setTimeout)

// привести переключтель в норм вид (сделала файл в sass)