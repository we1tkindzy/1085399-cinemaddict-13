import FilmsModel from "./model/films.js";
import CommentsModel from "./model/comments.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({ url: `movies` })
      .then(Api.toJSON)
      .then((films) => films.map(FilmsModel.adaptToClient));
  }

  getComments(filmId) {
    return this._load({ url: `comments/${filmId}` })
      .then(Api.toJSON)
      .then((comments) => comments.map(CommentsModel.adaptToClient));
  }

  updateFilms(film) {
    return this._load({
      url: `movies/${film.id}/`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptToServer(film)),
      headers: new Headers({ "Content-Type": `application/json` }),
    })
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient);
  }

  addComment(filmId, localComment) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(CommentsModel.adaptToServer(localComment)),
      headers: new Headers({ "Content-Type": `application/json` }),
    })
      .then(Api.toJSON)
      .then((response) => {
        const film = FilmsModel.adaptToClient(response.movie);
        const comments = response.comments.map((comment) =>
          CommentsModel.adaptToClient(comment)
        );

        return {
          film,
          comments,
        };
      });
  }

  deleteComment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    });
  }

  _load({ url, method = Method.GET, body = null, headers = new Headers() }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, { method, body, headers })
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
