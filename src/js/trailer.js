import * as basicLightbox from 'basiclightbox';
import API from './apiService.js';
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
      console.log('video__data: ', data); // delete after!!!

      const id = data.results[0].key;
      const instance = basicLightbox.create(`
  <iframe width="560" height="315"
  src='https://www.youtube.com/embed/${id}'
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
  </iframe>`);

      instance.show();
    });
  } catch (error) {
    console.log('onDrawModalFromTrailer__catch-error: ', error);

    const instance = basicLightbox.create(`
    <iframe width="560" height="315"
    src='http://www.youtube.com/embed/zwBpUdZ0lrQ'
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
    </iframe>`);

    instance.show();
  }
}

export default { onCreateTrailerLink };
