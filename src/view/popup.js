import dayjs from "dayjs";
import SmartView from "./smart.js";
import {EMOJIS} from "../utils/const.js";

const createCommentItemTemplate = (comment) => {
  const {emoji, commentDate, author, message} = comment;

  const date = commentDate !== null ? dayjs(commentDate).format(`MM/DD/YYYY h:mm`) : ``;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};


const createAddCommentEmojiTemplate = (addedEmoji) => {
  return EMOJIS.map(function (emoji) {
    const addedEmojiClassName = addedEmoji === emoji
      ? `checked`
      : ``;

    return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${addedEmojiClassName}>
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`;
  }).join(``);
};


const createsPopupTemplate = (film, commentItems) => {
  const {poster, isAddToWatchlist, isWatched, isFavorite, name, originalName, producer, screenwriters, cast, rating, releaseDate,
    viewingTime, country, genre, description, comments, addedEmoji, addedComment, ageRating} = film;

  const date = dayjs(releaseDate).format(`D MMMM YYYY`);

  const watchlistClassName = isAddToWatchlist
    ? `checked`
    : ``;

  const watchedClassName = isWatched
    ? `checked`
    : ``;

  const favoriteClassName = isFavorite
    ? `checked`
    : ``;

  const commentItemsTemplate = commentItems
    .map((comment) => createCommentItemTemplate(comment))
    .join(``);

  const emojisTemplate = createAddCommentEmojiTemplate(addedEmoji);

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">

            <p class="film-details__age">${ageRating}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${name}</h3>
                <p class="film-details__title-original">Original: ${originalName}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${producer}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${screenwriters}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${cast}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${date}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${viewingTime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${genre}</span>
                  <span class="film-details__genre">Film-Noir</span>
                  <span class="film-details__genre">Mystery</span></td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlistClassName}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watchedClassName}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoriteClassName}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments}</span></h3>

          <ul class="film-details__comments-list">
            ${commentItemsTemplate}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              <img src="./images/emoji/${addedEmoji}.png" width="55" height="55" alt="emoji-${addedEmoji}">
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="${addedComment}" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              ${emojisTemplate}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class Popup extends SmartView {
  constructor(film, comment) {
    super();
    this._data = film;
    this._comment = comment;

    this._popupClickHandler = this._popupClickHandler.bind(this);

    this._addWatchlistClickHandler = this._addWatchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);


    // this._addWatchlistChangeHandler = this._addWatchlistChangeHandler.bind(this);
    // this._watchedChangeHandler = this._watchedChangeHandler.bind(this);
    // this._favoriteChangeHandler = this._favoriteChangeHandler.bind(this);

    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._descriptionInputHandler = this._descriptionInputHandler.bind(this);


    this._setInnerHandlers();
  }

  getTemplate() {
    return createsPopupTemplate(this._data, this._comment);
  }


  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.popupClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, this._emojiChangeHandler);

    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._descriptionInputHandler);


    // this.getElement()
    //   .querySelector(`#watchlist`)
    //   .addEventListener(`change`, this._addWatchlistChangeHandler);
    // this.getElement()
    //   .querySelector(`#watched`)
    //   .addEventListener(`change`, this._watchedChangeHandler);
    // this.getElement()
    //   .querySelector(`#favorite`)
    //   .addEventListener(`change`, this._favoriteChangeHandler);
  }

  _descriptionInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      addedComment: evt.target.value
    }, true);
  }

  _emojiChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      addedEmoji: evt.target.value
    });
  }

  _popupClickHandler(evt) {
    evt.preventDefault();
    this._callback.popupClick(this._film);
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


  // _addWatchlistChangeHandler(evt) {
  //   evt.preventDefault();
  //   this.updateData(
  //       Object.assign(
  //           {},
  //           this._data,
  //           {isAddToWatchlist: !this._data.isAddToWatchlist}
  //       )
  //   );
  // }

  // _watchedChangeHandler(evt) {
  //   evt.preventDefault();
  //   this.updateData(
  //       Object.assign(
  //           {},
  //           this._data,
  //           {isWatched: !this._data.isWatched}
  //       )
  //   );
  // }

  // _favoriteChangeHandler(evt) {
  //   evt.preventDefault();
  //   this.updateData(
  //       Object.assign(
  //           {},
  //           this._data,
  //           {isFavorite: !this._data.isFavorite}
  //       )
  //   );
  // }

  setCloseButtonClickHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._popupClickHandler);
  }

  setAddWatchlisClickHandler(callback) {
    this._callback.addWatchlistClick = callback;
    this.getElement().querySelector(`#watchlist`).addEventListener(`click`, this._addWatchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`#watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
