import refs from './refs/refs';
const { bodyEl, btnFooterEl, footerBackdropEl } = refs;
btnFooterEl.addEventListener('click', onFooterBtnClick);
footerBackdropEl.addEventListener('click', onFooterModalClose);

function onFooterBtnClick(e) {
  e.preventDefault();
  footerBackdropEl.classList.remove('is-hidden');
  bodyEl.classList.add('backdrop-open');
  window.addEventListener('keydown', onEscPress);
}

function onFooterModalClose(e) {
  if (e.target === footerBackdropEl) {
    footerBackdropEl.classList.add('is-hidden');
    bodyEl.classList.remove('backdrop-open');
    window.removeEventListener('keydown', onEscPress);
  }
}

function onEscPress(e) {
  if (e.code === 'Escape') {
    footerBackdropEl.classList.add('is-hidden');
    bodyEl.classList.remove('backdrop-open');
  }
  window.removeEventListener('keydown', onEscPress);
}
