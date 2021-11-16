class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.API_KEY = 'd9be23358e97f87c33dbf928d8eaec37';
    this.BASE_URL = `https://api.themoviedb.org/3`;
  }
  async fetchPopularMovies() {
    const url = `${this.BASE_URL}/movie/popular?api_key=${this.API_KEY}&page=${this.page}`;
    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data;
      });
  }
  async fetchSearchMovies() {
    const url = `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data;
      });
  }
  async fetchMovieGenre() {
    const url = `${this.BASE_URL}/genre/movie/list?api_key=${this.API_KEY}&language=en-US`;
    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.genres;
      });
  }
  async fetchAllPopularPerDay() {
    const url = `${this.BASE_URL}/trending/all/day?api_key=${this.API_KEY}`;
    return await fetch(url).then(response => response.json());
  }
  async fetchAllVideos(id) {
    const APIKEY = 'f6f92051b45422d9426f457ad6610127';
    const url = `${this.BASE_URL}/movie/${id}/videos?api_key=${APIKEY}&language=en-US`;
    return await fetch(url).then(response => response.json());
  }
  async fetchNowPlayingMovies() {
    const url = `${this.BASE_URL}/movie/now_playing?api_key=${this.API_KEY}&page=${this.page}`;
    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data;
      });
  }
  async fetchTopRatedMovies() {
    const url = `${this.BASE_URL}/movie/top_rated?api_key=${this.API_KEY}&page=${this.page}`;
    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data;
      });
  }
  async fetchUpcomingMovies() {
    const url = `${this.BASE_URL}/movie/upcoming?api_key=${this.API_KEY}&page=${this.page}`;
    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data;
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
window.ApiService = new ApiService();
export default ApiService;
