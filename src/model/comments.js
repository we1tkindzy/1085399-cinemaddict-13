import Observer from "../utils/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update) {
    const { film, comments } = update;
    this._comments = comments;

    this._notify(updateType, film);
  }

  deleteComment(updateType, update) {
    const index = this._comments.findIndex(
      (comment) => Number(comment.id) === Number(update)
    );

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign({}, comment, {
      message: comment.comment,
      emoji: comment.emotion,
      commentDate: new Date(comment.date),
    });

    delete adaptedComment.comment;
    delete adaptedComment.emotion;
    delete adaptedComment.date;

    return adaptedComment;
  }

  static adaptToServer(comment) {
    const adaptedComment = Object.assign({}, comment, {
      comment: comment.message,
      emotion: comment.emoji,
      date: comment.commentDate.toISOString(),
    });

    delete adaptedComment.message;
    delete adaptedComment.emoji;
    delete adaptedComment.commentDate;

    return adaptedComment;
  }
}
