import AbstractView from "./abstract.js";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const createCommentItemTemplate = (comment) => {
  const {emoji, commentDate, author, message} = comment;


  // const date = commentDate !== null ? dayjs(commentDate).format(`MM/DD/YYYY h:mm`) : ``;

  let date = dayjs(commentDate).fromNow(true) + ` ago`;

  if (date === `a day ago` || date === `a few seconds ago`) {
    date = `today`;
  }


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

export default class Comment extends AbstractView {
  constructor(comment) {
    super();

    this._comment = comment;

    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  getTemplate() {
    return createCommentItemTemplate(this.comment);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(this._comment);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._deleteClickHandler);
  }
}
