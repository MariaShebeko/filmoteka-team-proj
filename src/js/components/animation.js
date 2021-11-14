import LazyLinePainter from 'lazy-line-painter';
import refs from '../refs/refs';

const animationFilmoptim = new LazyLinePainter(refs.iconFilmEl, {
  ease: 'easeLinear',
  strokeWidth: 2,
  strokeOpacity: 1,
  strokeColor: '#ff6b08',
  strokeCap: 'butt',
  strokeJoin: 'round',
  delay: 200,
  repeat: 3000,
});

animationFilmoptim.paint();
