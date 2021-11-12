import * as basicLightbox from 'basiclightbox';
import trailerVideoGoodTemplate from '../templates/trailer-video-good.hbs';
import trailerVideoErrorTemplate from '../templates/trailer-video-error.hbs';
import API from './apiService.js';
import refs from './refs/refs.js';
const { bodyEl } = refs;
const videoAPI = new API();

//testing -- not working
// function onIsTrailerHasListener(element) {
//   if (element.getAttribute('listener') === 'true') return;
//   element.setAttribute('listener', true);
// }
//testing -- not working

// Need correct auto-remove listener
const EventHandler = param => event => {
  if (!document.querySelector('.basicLightbox')) return;
  if (event.key === 'Escape' || event.code === 'Escape' || event.keyCode == 27) {
    // bodyEl.setAttribute('listener', true);
    param.close();
    // onIsTrailerHasListener(bodyEl);

    return bodyEl.removeEventListener('keydown', EventHandler);
  }
};

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
      bodyEl.setAttribute('listener', true);

      bodyEl.addEventListener('keydown', EventHandler(instance));
    });
  } catch (error) {
    console.log('catch-error: onDrawModalFromTrailer: ', error);

    const instance = basicLightbox.create(trailerVideoErrorTemplate());
    instance.show();

    bodyEl.addEventListener('keydown', EventHandler(instance));
  }
}

export default { onCreateTrailerLink };
