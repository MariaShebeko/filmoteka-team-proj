import * as basicLightbox from 'basiclightbox';
import trailerVideoGoodTemplate from '../templates/trailer-video-good.hbs';
import trailerVideoErrorTemplate from '../templates/trailer-video-error.hbs';
import trailerCloseButtonTemplate from '../templates/trailer-close-button.hbs';
import API from './apiService.js';
import refs from './refs/refs.js';
const { bodyEl } = refs;
const videoAPI = new API();

function onCreateTrailerLink(elementsRef) {
  elementsRef.forEach(element => {
    element.addEventListener('click', e => {
      onDrawModalFromTrailer(e.target.dataset.id);
    });
  });
}

async function onDrawModalFromTrailer(id) {
  try {
    await videoAPI.fetchAllVideos(id).then(data => {
      const responseData = {
        id: data.results[0].key,
        name: data.results[0].name,
      };
      const instance = basicLightbox.create(trailerVideoGoodTemplate(responseData));
      instance.show();
      bodyEl.addEventListener('keydown', onPressedEscapeCloseTrailer);
      onButtonCloseModalTrailer(instance);
    });
  } catch (error) {
    console.log('catch-error: onDrawModalFromTrailer: ', error);
    const instance = basicLightbox.create(trailerVideoErrorTemplate());
    instance.show();
    bodyEl.addEventListener('keydown', onPressedEscapeCloseTrailer);
    onButtonCloseModalTrailer(instance);
  }
}

function onPressedEscapeCloseTrailer(event) {
  if (!document.querySelector('.basicLightbox')) return;
  if (event.key === 'Escape' || event.code === 'Escape' || event.keyCode == 27) {
    const trailerBackdropEl = document.querySelector('.basicLightbox');
    trailerBackdropEl.classList.remove('basicLightbox--visible');
    bodyEl.removeEventListener('keydown', onPressedEscapeCloseTrailer);
  }
}

function onButtonCloseModalTrailer(instance) {
  const trailerBackdropEl = document.querySelector('.basicLightbox');
  trailerBackdropEl.insertAdjacentHTML('afterbegin', trailerCloseButtonTemplate());
  const modalCloseButtonEl = document.querySelector('.lightbox__button-close');
  modalCloseButtonEl.addEventListener('click', () => instance.close(), { once: true });
}

export default { onCreateTrailerLink };
