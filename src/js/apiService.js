const API_KEY = 'd9be23358e97f87c33dbf928d8eaec37';
const BASE_URL = `https://api.themoviedb.org/3`;

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchPopularMovies() {
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${this.page}`;
    // const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then((data) => {
        this.incrementPage();

        const genres = JSON.parse(localStorage.getItem('genres'));
        console.log(genres);
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
        });

        data.results.map(item => {
          let filmGenresAll = [];
          genres.find(elem => {
            if (item.genre_ids.includes(elem.id)) {
              filmGenresAll.push(elem.name);
            }
          });
          item.genresAll = filmGenresAll;
        });

        console.log(data);
        return data;
      });
  }
  fetchSearchMovies() { //==to enter name to surch movie by the user == для ввода названия фильма пользователем для поиска ==
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        this.incrementPage();
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
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  set pageNumber(pageNumber) {
    this.page = pageNumber;
  }

  get pageNumber() {
    return this.page;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
