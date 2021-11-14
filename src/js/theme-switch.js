import refs from './refs/refs';

const {
  bodyEl,
  checkboxEl,
  buttonWatchedEl,
  buttonQueueEl,
  buttonCloseIconEl,
  modalFilmEl,
  modalFilmDescriptionEl,
  filterBtnEl,
} = refs;

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

checkboxEl.addEventListener('change', themeChange);

function themeChange(event) {
  const isChecked = event.target.checked;

  if (isChecked) {
    bodyEl.classList.remove(Theme.LIGHT);
    bodyEl.classList.add(Theme.DARK);
    localStorage.setItem('theme', Theme.DARK);
  } else {
    bodyEl.classList.remove(Theme.DARK);
    bodyEl.classList.add(Theme.LIGHT);
    localStorage.setItem('theme', Theme.LIGHT);
  }
}

function currentTheme() {
  if (localStorage.getItem('theme') === Theme.DARK) {
    checkboxEl.checked = true;
    bodyEl.classList.add(Theme.DARK);
  }
}
currentTheme();
