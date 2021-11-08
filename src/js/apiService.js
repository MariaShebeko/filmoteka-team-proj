const API_KEY = 'd9be23358e97f87c33dbf928d8eaec37';
const BASE_URL = `https://api.themoviedb.org/3`;

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchPopularMovies() {
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        this.incrementPage();

        // getting short genres names list from local storage
        const genres = JSON.parse(localStorage.getItem('genres'));
        console.log(genres);
        results.map(item => {
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
        });

        // getting full genres names list from local storage
        results.map(item => {
          let filmGenresAll = [];
          genres.find(elem => {
            if (item.genre_ids.includes(elem.id)) {
              filmGenresAll.push(elem.name);
            }
          });
          item.genresAll = filmGenresAll;
        });

        // transforming full date in year in results
        results.map(item => {
          item.release_year = item.release_date.slice(0, 4);
        });

        console.log(results);
        return results;
      });
  }
  fetchSearchMovies() {
    //==to enter name to surch movie by the user == для ввода названия фильма пользователем для поиска ==
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        this.incrementPage();

        // transforming full date in year in results
        results.map(item => {
          item.release_year = item.release_date.slice(0, 4);
        });

        return results;
      });
  }
  fetchMovieGenre() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.genres;
      });
  }
  fetchAllPopularPerDay() {
    const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}`;
    return fetch(url).then(response => response.json());
  }
  fetchAllVideos(id) {
    const APIKEY = 'f6f92051b45422d9426f457ad6610127';
    const url = `${BASE_URL}/movie/${id}/videos?api_key=${APIKEY}&language=en-US`;

    console.log('fetchAllVideos__url: ', url); // delete after!!!
    console.log('fetchAllVideos__id: ', id); // delete after!!!

    return fetch(url).then(response => response.json());
  }
  incrementPage() {
    this.page += 1;
  }

  getPage() {
    return this.page;
  }

  setPage(numberOfPage) {
    return (this.page = numberOfPage);
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
