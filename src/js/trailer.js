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
      console.log('onDrawModalFromTrailer__fetch-data: ', data); // delete after!!!

      const responseData = {
        id: data.results[0].key,
        name: data.results[0].name,
      };
      const instance = basicLightbox.create(`
  <h2 class="trailer-title">${responseData.name}</h2>

  <div class="trailer-container">

  <iframe
  class="responsive-iframe"
  width="560"
  height="315"
  src='https://www.youtube.com/embed/${responseData.id}'
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
  </iframe>

  </div>`);
      instance.show();
    });
  } catch (error) {
    console.log('onDrawModalFromTrailer__catch-error: ', error);

    const instance = basicLightbox.create(`
  <h2 class="trailer-title">404 video trailer not found</h2>

  <div class="trailer-container">

  <iframe
  class="responsive-iframe"
  width="560"
  height="315"
  src="http://www.youtube.com/embed/zwBpUdZ0lrQ"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
  </iframe>

  </div>`);
    instance.show();
  }
}

export default { onCreateTrailerLink };
