import dayjs from "dayjs";
import AbstractView from "./abstract.js";

const createsFilmCardTemplate = (film) => {
  const {poster, isAddToWatchlist, isWatched, isFavorite, name, rating, releaseDate, viewingTime, genre, description, comments} = film;

  const date = releaseDate !== null ? dayjs(releaseDate).format(`YYYY`) : ``;

  const watchlistClassName = isAddToWatchlist
    ? `film-card__controls-item--add-to-watchlist film-card__controls-item--active`
    : `film-card__controls-item--add-to-watchlist`;

  const watchedClassName = isWatched
    ? `film-card__controls-item--mark-as-watched film-card__controls-item--active`
    : `film-card__controls-item--mark-as-watched`;

  const favoriteClassName = isFavorite
    ? `film-card__controls-item--favorite film-card__controls-item--active`
    : `film-card__controls-item--favorite`;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${date}</span>
        <span class="film-card__duration">${viewingTime}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button ${watchlistClassName}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button ${watchedClassName}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button ${favoriteClassName}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._cardClickHandler = this._cardClickHandler.bind(this);
    // this._addWatchlistClickHandler = this._addWatchlistClickHandler.bind(this);
    // this._watchedClickHandler = this._watchedClickHandler.bind(this);
    // this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createsFilmCardTemplate(this._film);
  }

  _cardClickHandler(evt) {
    evt.preventDefault();
    this._callback.cardClick();
  }


  // _addWatchlistClickHandler(evt) {
  //   evt.preventDefault();
  //   this._callback.addWatchlistClick();
  // }

  // _watchedClickHandler(evt) {
  //   evt.preventDefault();
  //   this._callback.watchedClick();
  // }

  // _favoriteClickHandler(evt) {
  //   evt.preventDefault();
  //   this._callback.favoriteClick();
  // }


  setPosterClickHandle(callback) {
    this._callback.cardClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._cardClickHandler);
  }

  setTitleClickHandle(callback) {
    this._callback.cardClick = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._cardClickHandler);
  }

  setCommentsClickHandle(callback) {
    this._callback.cardClick = callback;
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._cardClickHandler);
  }


  // setAddWatchlisClickHandler(callback) {
  //   this._callback.addWatchlistClick = callback;
  //   this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._addWatchlistClickHandler);
  // }

  // setWatchedClickHandler(callback) {
  //   this._callback.watchedClick = callback;
  //   this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  // }

  // setFavoriteClickHandler(callback) {
  //   this._callback.favoriteClick = callback;
  //   this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  // }
}
