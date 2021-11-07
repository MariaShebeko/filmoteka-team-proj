//delete if not used
import API from '../apiService.js';
import filmCardsTemplate from '../../templates/slider.hbs';
import refs from '../refs/refs.js';
const { sliderEl } = refs;
const sliderAPI = new API();

// need correct func to exports

onSliderLoad();
setTimeout(() => slider(), 500);

function onSliderLoad() {
  try {
    sliderAPI.fetchPopularMovies().then(appendSliderMarkup);
  } catch (error) {
    // add notify there
    throw error;
  }
}

function appendSliderMarkup(results) {
  sliderEl.insertAdjacentHTML('afterbegin', filmCardsTemplate(results));
}

function slider() {
  window.jQuery = window.$ = require('jquery');
  require('../slider/slick.min.js');

  $(document).ready(function () {
    $('.slider').slick({
      arrows: true,
      dots: true, // true/false
      adaptiveHeight: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 1000,
      easing: 'ease',
      infinite: true,
      initialSlide: 1,
      autoplay: true, // true/false
      autoplaySpeed: 1000,
      pauseOnFocus: true,
      pauseOnHover: true,
      pauseOnDotsHover: true,
      draggable: true,
      swipe: true,
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
            dots: false,
          },
        },
      ],
    });
  });
}
