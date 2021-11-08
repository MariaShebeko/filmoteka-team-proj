//delete if not used
import API from '../apiService.js';
import filmCardsTemplate from '../../templates/slider.hbs';
import refs from '../refs/refs.js';
import trailer from '../trailer.js';
const { sliderEl } = refs;
const { onCreateTrailerLink } = trailer;
const sliderAPI = new API();

// need correct async func to export

onSliderLoad();

async function onSliderLoad() {
  try {
    await sliderAPI
      .fetchAllPopularPerDay()
      .then(({ results }) => {
        sliderAPI.incrementPage();

        console.log('allPopularPerDay__results: ', results);
        return results;
      })
      .then(appendSliderMarkup);

    onSliderActivation();
  } catch (error) {
    // add notify there (need library)
    console.log('Error-allPopularPerDay: ', error); // delete after
    throw error;
  }
}

function appendSliderMarkup(data) {
  sliderEl.insertAdjacentHTML('afterbegin', filmCardsTemplate(data.results));

  onCreateTrailerLink(document.querySelectorAll('.button-youtube'));
}

async function onSliderActivation() {
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
      autoplay: false, // true
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

export default { onSliderLoad };
