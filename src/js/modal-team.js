const btnFooterEl = document.querySelector('.footer-link');
const footerBackdropEl = document.querySelector('.js-footer');

btnFooterEl.addEventListener('click', onFooterBtnClick);
footerBackdropEl.addEventListener('click', onFooterModalClose);

function onFooterBtnClick(e) {
  e.preventDefault();
  footerBackdropEl.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscPress);
}

function onFooterModalClose(e) {
  if (e.target === footerBackdropEl) {
    footerBackdropEl.classList.add('is-hidden');
  }
  window.removeEventListener('keydown', onEscPress);
}

function onEscPress(e) {
  if (e.code === 'Escape') {
    footerBackdropEl.classList.add('is-hidden');
    console.log(5);
  }
  window.removeEventListener('keydown', onEscPress);
}
