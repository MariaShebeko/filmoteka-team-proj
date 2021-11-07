const buttonUp = document.querySelector('[data-button-up]');

window.addEventListener('scroll', showButtonUp);
buttonUp.addEventListener('click', onButtonUpClick);

function showButtonUp() {
  if (pageYOffset < document.documentElement.clientHeight) {
    buttonUp.classList.add('visually-hidden');
  } else {
    buttonUp.classList.remove('visually-hidden');
  }
}

function onButtonUpClick() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
