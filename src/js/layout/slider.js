//delete if not used
import API from '../apiService.js';
import filmCardsTemplate from '../../templates/slider.hbs';
import refs from '../refs/refs.js';
const { sliderEl } = refs;
const sliderAPI = new API();

// need correct async func to export

onSliderLoad();

async function onSliderLoad() {
  try {
    await sliderAPI.fetchPopularMovies().then(appendSliderMarkup);
    slider();
  } catch (error) {
    // add notify there
    throw new Error(error);
  }
}

function appendSliderMarkup(data) {
  sliderEl.insertAdjacentHTML('afterbegin', filmCardsTemplate(data.results));
}

async function slider() {
  window.jQuery = window.$ = require('jquery');
  require('../slider/slick.min.js');

  $(document).ready(function () {
    $('.slider').slick({
      arrows: true,
      dots: false,
      adaptiveHeight: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 1000,
      easing: 'ease',
      infinite: true,
      initialSlide: 1,
      autoplay: true,
      autoplaySpeed: 1000,
      pauseOnFocus: true,
      pauseOnHover: true,
      pauseOnDotsHover: true,
      draggable: true,
      swipe: true,
      swipeToSlide: true,
      touchThreshold: 4,
      touchMove: true,
      waitForAnimate: true,
      mobileFirst: false,
      variableWidth: true,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            mobileFirst: true,
            arrows: false,
          },
        },
      ],
    });
  });
}
