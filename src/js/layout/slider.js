import API from '../apiService.js';
import filmCardsTemplate from '../../templates/slider.hbs';
import refs from '../refs/refs.js';
import trailer from '../trailer.js';
import { onCatchError } from '../components/pnotify.js';
const { sliderEl } = refs;
const { onCreateTrailerLink } = trailer;
const sliderAPI = new API();

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
      .then(onAppendSliderMarkup);

    onSliderActivation();
  } catch (error) {
    console.log('allPopularPerDay_catchError: ', error); // delete after

    onCatchError(error);
  }
}

function onAppendSliderMarkup(results) {
  sliderEl.insertAdjacentHTML('afterbegin', filmCardsTemplate(results));

  onCreateTrailerLink(document.querySelectorAll('.btn-youtube'));
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

export default { onSliderLoad };
