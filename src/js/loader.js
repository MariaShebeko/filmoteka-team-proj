import refs from './refs/refs';

const { loaderBackdropEl, bodyEl } = refs;

export function showLoader() {
  loaderBackdropEl.classList.toggle('is-hidden');
  bodyEl.classList.toggle('backdrop-open');
}
