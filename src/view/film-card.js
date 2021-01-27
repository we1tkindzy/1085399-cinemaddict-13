import dayjs from "dayjs";
import {getTimeFromMins} from "../utils/common.js";
import AbstractView from "./abstract.js";

const createsFilmCardTemplate = (film) => {
  const {poster, isAddToWatchlist, isWatched, isFavorite, name, rating, releaseDate, viewingTime, genre, description, comments} = film;
  const commentsCount = comments.length < 2 ? comments.length + ` comment` : comments.length + ` comments`;

  const date = dayjs(releaseDate).format(`YYYY`);

  const filmTime = getTimeFromMins(viewingTime);

  const geners = genre.length >= 1 ? genre[0] : genre;
  const descriptionLength = description.length > 140 ? description.slice(0, 139) + `...` : description;

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
        <span class="film-card__duration">${filmTime}</span>
        <span class="film-card__genre">${geners}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${descriptionLength}</p>
      <a class="film-card__comments">${commentsCount}</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button ${watchlistClassName}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button ${watchedClassName}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button ${favoriteClassName}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(film, comments) {
    super();
    this._film = film;
    this._comments = comments;

    this._cardClickHandler = this._cardClickHandler.bind(this);
    this._addWatchlistClickHandler = this._addWatchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createsFilmCardTemplate(this._film);
  }

  _cardClickHandler(evt) {
    evt.preventDefault();
    this._callback.cardClick();
  }


  _addWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.addWatchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }


  setPosterClickHandler(callback) {
    this._callback.cardClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._cardClickHandler);
  }

  setTitleClickHandler(callback) {
    this._callback.cardClick = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._cardClickHandler);
  }

  setCommentsClickHandler(callback) {
    this._callback.cardClick = callback;
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._cardClickHandler);
  }


  setAddWatchlisClickHandler(callback) {
    this._callback.addWatchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._addWatchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
