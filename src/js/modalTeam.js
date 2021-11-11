const btnFooterEl = document.querySelector('.footer__link');
const footerBackdropEl = document.querySelector('#footer-backdrop');
import refs from './refs/refs';
btnFooterEl.addEventListener('click', onFooterBtnClick);
footerBackdropEl.addEventListener('click', onFooterModalClose);

function onFooterBtnClick(e) {
  e.preventDefault();
  footerBackdropEl.classList.remove('is-hidden');
  refs.bodyEl.classList.add('backdrop-open');
  window.addEventListener('keydown', onEscPress);
}

function onFooterModalClose(e) {
  if (e.target === footerBackdropEl) {
    footerBackdropEl.classList.add('is-hidden');
    refs.bodyEl.classList.remove('backdrop-open');
    window.removeEventListener('keydown', onEscPress);
  }
}

function onEscPress(e) {
  if (e.code === 'Escape') {
    footerBackdropEl.classList.add('is-hidden');
    refs.bodyEl.classList.remove('backdrop-open');
  }
  window.removeEventListener('keydown', onEscPress);
}
