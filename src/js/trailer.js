import * as basicLightbox from 'basiclightbox';
import trailerVideoGoodTemplate from '../templates/trailer-video-good.hbs';
import trailerVideoErrorTemplate from '../templates/trailer-video-error.hbs';
import trailerVideoCloseButtonTemplate from '../templates/trailer-video-close-button.hbs';
import { showLoader } from './loader.js';
import API from './api-service.js';
const videoAPI = new API();

// activate function: after appending/inserting markup/html, call that: onCreateTrailerLink(document.querySelectorAll('.btn-youtube'));
export function onCreateTrailerLink(elementsRef) {
  elementsRef.forEach(element => {
    element.addEventListener('click', e => {
      onDrawModalFromTrailer(e.target.dataset.id);
    });
  });
}

async function onDrawModalFromTrailer(id) {
  try {
    showLoader();
    await videoAPI.fetchAllVideos(id).then(data => {
      const responseData = {
        id: data.results[0].key,
        name: data.results[0].name,
      };
      const instance = basicLightbox.create(trailerVideoGoodTemplate(responseData));
      instance.show();
      showLoader();
      onButtonCloseModalTrailer(instance);
    });
  } catch (error) {
    const instance = basicLightbox.create(trailerVideoErrorTemplate());
    instance.show();
    onButtonCloseModalTrailer(instance);
    showLoader();
  }
}

function onButtonCloseModalTrailer(instance) {
  const lightboxModalPlaceholderEl = document.querySelector('.basicLightbox__placeholder');
  lightboxModalPlaceholderEl.insertAdjacentHTML('afterbegin', trailerVideoCloseButtonTemplate());
  const modalCloseButtonEl = document.querySelector('.lightbox__button-close');
  modalCloseButtonEl.addEventListener('click', () => instance.close() /*, { once: true }*/);
}
