import refs from './refs/refs';
import { dataFilm } from './modalFilm.js';

const { modalFilmEl } = refs;

function queve(e) {
  if (e.target.dataset.value !== 'queve') return;
  if (!localStorage.getItem('queve')) {
    const arrayQueve = [];
    addToArrayQueveFirst(e, arrayQueve);
  } else if (JSON.parse(localStorage.getItem('queve')).some(el => el.title === dataFilm.title)) {
    deleteFromArrayQueve(e);
  } else {
    addToArrayQueve(e);
  }
}

function addToArrayQueveFirst(e, arrayQueve) {
  arrayQueve.push(dataFilm);
  setLocalArrayQueve(arrayQueve);
  e.target.textContent = 'REMOVE';
}

function addToArrayQueve(e) {
  const newArrayQueve = JSON.parse(localStorage.getItem('queve'));
  newArrayQueve.push(dataFilm);
  setLocalArrayQueve(newArrayQueve);
  e.target.textContent = 'REMOVE';
}

function deleteFromArrayQueve(e) {
  const newArrayQueve = JSON.parse(localStorage.getItem('queve'));
  newArrayQueve.splice(
    newArrayQueve.findIndex(el => el.title === dataFilm.title),
    1,
  );
  setLocalArrayQueve(newArrayQueve);
  e.target.textContent = 'ADD TO QUEVE';
}

function setLocalArrayQueve(array) {
  localStorage.setItem('queve', JSON.stringify(array));
}

modalFilmEl.addEventListener('click', queve);
