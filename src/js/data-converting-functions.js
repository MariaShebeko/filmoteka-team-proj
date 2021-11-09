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
