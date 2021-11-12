import * as basicLightbox from 'basiclightbox';
import trailerVideoGoodTemplate from '../templates/trailer-video-good.hbs';
import trailerVideoErrorTemplate from '../templates/trailer-video-error.hbs';
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
    });
  } catch (error) {
    console.log('catch-error: onDrawModalFromTrailer: ', error);
    const instance = basicLightbox.create(trailerVideoErrorTemplate());
    instance.show();
    bodyEl.addEventListener('keydown', onPressedEscapeCloseTrailer);
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

export default { onCreateTrailerLink };
