export function convertingData(data) {
  toGetYear(data);
  toGetShortGenresList(data);
  toGetFullGenresList(data);
  toSetRussianValues(data);
  return data;
}

// setting russian title and overview
function toSetRussianValues(data) {
  data.results.map(item => {
    let id = item.id;
    getLanguages(id, item);
  });
  return data;
}

function getLanguages(id, item) {
  const url = `https://api.themoviedb.org/3/movie/${id}/translations?api_key=d9be23358e97f87c33dbf928d8eaec37`;
  return fetch(url)
    .then(response => response.json())
    .then(languages => {
      // console.log(languages.translations);
      const russianIndex = languages.translations.findIndex(el => el.english_name === 'Russian');
      if (russianIndex !== -1) {
        // console.log(languages.translations[russianIndex].data.title);
        // console.log(languages.translations[russianIndex].data.overview);
        item.atitle_ru = languages.translations[russianIndex].data.title;
        item.overview_ru = languages.translations[russianIndex].data.overview;
      }

      // item.russian_title = languages.translations.find(el => el.english_name === 'Russian');
      return languages;
    });
}

// getLanguages()
//   .then(languages => {
//     return languages.translations.find(el => el.english_name === 'Russian');
//   })
//   .then(el => {
//     russianValues = el.data;

//     return russianValues;
//   });

// transforming full date in year in results
export function toGetYear(data) {
  data.results.map(item => {
    if (item.release_date) {
      item.release_year = item.release_date.slice(0, 4);
    }
    if (item.first_air_date) {
      item.release_year = item.first_air_date.slice(0, 4);
    }
  });

  data.results.map(item => {
    if (!item.release_date) {
      item.release_year = 'No release year';
    }
  });

  return data;
}
// getting short genres names list from local storage
export function toGetShortGenresList(data) {
  const genres = JSON.parse(localStorage.getItem('genres'));
  data.results.map(item => {
    let filmGenres = [];
    genres.find(elem => {
      if (item.genre_ids.includes(elem.id)) {
        filmGenres.push(elem.name);
      }
    });
    if (filmGenres.length <= 3) {
      item.genresShort = filmGenres.join(', ');
    }
    if (filmGenres.length > 3) {
      filmGenres.splice(2, filmGenres.length - 2);
      filmGenres.push('Other');
      item.genresShort = filmGenres.join(', ');
    }
    if (filmGenres.length === 0) {
      filmGenres.push('Other');
      item.genresShort = filmGenres.join(', ');
    }
  });
  return data;
}
// getting full genres names list from local storage
export function toGetFullGenresList(data) {
  const genres = JSON.parse(localStorage.getItem('genres'));
  data.results.map(item => {
    let filmGenresAll = [];
    genres.find(elem => {
      if (item.genre_ids.includes(elem.id)) {
        filmGenresAll.push(elem.name);
      }
    });
    item.genresAll = filmGenresAll;
  });
  return data;
}
