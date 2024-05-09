export default class SwapiService {
  authenticationToken =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2Y5ODBhMGMxMDcyMjY0NTYxMGEwMTczNTA4Y2Q4OCIsInN1YiI6IjY2MGM0MmJkNWFhZGM0MDE2MzYzYmZmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r_QW1g6BTMC7AQRUw90bPlvAjjJbmwDIoLtGI3_vS9U';

  apiKey = 'b7f980a0c10722645610a0173508cd88';

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: this.authenticationToken,
    },
  };

  async getResource(url, option) {
    const res = await fetch(url, option);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, reseived ${res.status}`);
    }
    const body = await res.json();
    return body;
  }

  async getOfNameMovies(name, page) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=ru-RU&page=${page}`,
      this.options
    );
    return res.results;
  }

  async getTotalPages(name, page) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=ru-RU&page=${page}`,
      this.options
    );
    return res.total_pages;
  }

  async getMovieGenres() {
    const res = await this.getResource(
      'https://api.themoviedb.org/3/genre/movie/list?language=ru',
      this.options
    );
    return res.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
  }

  async createGuestSession() {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/authentication/guest_session/new`,
      this.options
    );
    return res.guest_session_id;
  }

  async addMovieRating(idMovie, rating, guestSessionId) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: this.authenticationToken,
      },
      body: JSON.stringify({ value: rating }),
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${idMovie}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`,
        options
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async getRatedMovie(guestSessionId) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies`,
      this.options
    );
    return res.results;
  }
}
