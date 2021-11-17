const genresRu = [
  { id: 28, name: 'Боевик' },
  { id: 12, name: 'Приключения' },
  { id: 16, name: 'Мультфильм' },
  { id: 35, name: 'Комедия' },
  { id: 80, name: 'Криминал' },
  { id: 99, name: 'Документальный' },
  { id: 18, name: 'Драма' },
  { id: 10751, name: 'Семейный' },
  { id: 14, name: 'Фантастика' },
  { id: 36, name: 'Исторический' },
  { id: 27, name: 'Ужасы' },
  { id: 10402, name: 'Мюзикл' },
  { id: 9648, name: 'Мистика' },
  { id: 10749, name: 'Романтический' },
  { id: 878, name: 'Научная фантастика' },
  { id: 10770, name: 'ТВ шоу' },
  { id: 53, name: 'Триллер' },
  { id: 10752, name: 'Военный' },
  { id: 37, name: 'Вестерн' },
];

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
      const russianIndex = languages.translations.findIndex(el => el.english_name === 'Russian');
      if (russianIndex !== -1) {
        item.atitle_ru = languages.translations[russianIndex].data.title;
        item.overview_ru = languages.translations[russianIndex].data.overview;
      }
      return languages;
    });
}

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
    let filmGenresRu = [];
    genres.find(elem => {
      if (item.genre_ids.includes(elem.id)) {
        filmGenres.push(elem.name);
      }
    });

    genresRu.find(elem => {
      if (item.genre_ids.includes(elem.id)) {
        filmGenresRu.push(elem.name);
      }
    });

    if (filmGenres.length <= 3) {
      item.genresShort = filmGenres.join(', ');
    }

    if (filmGenresRu.length <= 3) {
      item.genresShortRu = filmGenresRu.join(', ');
    }

    if (filmGenres.length > 3) {
      filmGenres.splice(2, filmGenres.length - 2);
      filmGenres.push('Other');
      item.genresShort = filmGenres.join(', ');
    }

    if (filmGenresRu.length > 3) {
      filmGenresRu.splice(2, filmGenresRu.length - 2);
      filmGenresRu.push('Other');
      item.genresShortRu = filmGenresRu.join(', ');
    }

    if (filmGenres.length === 0) {
      filmGenres.push('Other');
      item.genresShort = filmGenres.join(', ');
    }

    if (filmGenresRu.length === 0) {
      filmGenresRu.push('Other');
      item.genresShortRu = filmGenresRu.join(', ');
    }
  });
  return data;
}

// getting full genres names list from local storage
export function toGetFullGenresList(data) {
  const genres = JSON.parse(localStorage.getItem('genres'));
  data.results.map(item => {
    let filmGenresAll = [];
    let genresAllRu = [];

    genres.find(elem => {
      if (item.genre_ids.includes(elem.id)) {
        filmGenresAll.push(elem.name);
      }
    });

    genresRu.find(elem => {
      if (item.genre_ids.includes(elem.id)) {
        genresAllRu.push(elem.name);
      }
    });

    item.genresAll = filmGenresAll;
    item.genresAllRu = genresAllRu;
  });
  return data;
}

translateGenres();
function translateGenres() {
  const genres = JSON.parse(localStorage.getItem('genres'));
  console.log(genres);
}
