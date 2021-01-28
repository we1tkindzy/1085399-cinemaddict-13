import Observer from "../utils/observer.js";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          cast: film.film_info.actors,
          ageRating: film.film_info.age_rating,
          originalName: film.film_info.alternative_title,
          description: film.film_info.description,
          producer: film.film_info.director,
          genre: film.film_info.genre,
          poster: film.film_info.poster,
          releaseDate: new Date(film.film_info.release.date),
          country: film.film_info.release.release_country,
          viewingTime: film.film_info.runtime,
          name: film.film_info.title,
          rating: film.film_info.total_rating,
          screenwriters: film.film_info.writers,

          isWatched: film.user_details.already_watched,
          isFavorite: film.user_details.favorite,
          watchingDate: film.user_details.watching_date,
          isAddToWatchlist: film.user_details.watchlist
        }
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const filmInfo = {
      [`actors`]: film.cast,
      [`age_rating`]: film.ageRating,
      [`alternative_title`]: film.originalName,
      [`description`]: film.description,
      [`director`]: film.producer,
      [`genre`]: film.genre,
      [`poster`]: film.poster,
      [`release`]: {
        [`date`]: film.releaseDate.toISOString(),
        [`release_country`]: film.country
      },
      [`runtime`]: film.viewingTime,
      [`title`]: film.name,
      [`total_rating`]: film.rating,
      [`writers`]: film.screenwriters
    };

    const userDetails = {
      [`already_watched`]: film.isWatched,
      [`favorite`]: film.isFavorite,
      [`watching_date`]: film.isWatched ?
        film.watchingDate : null,
      [`watchlist`]: film.isAddToWatchlist
    };

    const adaptedFilm = Object.assign(
        {},
        film,
        {
          [`film_info`]: filmInfo,
          [`user_details`]: userDetails,
          [`id`]: film.id,
          [`comments`]: film.comments
        }
    );

    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;

    return adaptedFilm;
  }
}
