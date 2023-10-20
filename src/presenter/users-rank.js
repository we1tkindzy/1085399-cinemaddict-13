import UserProfileView from "../view/user-profile.js";
import { RenderPosition, render, replace, remove } from "../utils/render.js";

const UserRank = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
};

const NOVICE_AMOUNT = 0;
const FAN_AMOUNT = 10;
const MOVIE_BUFF_AMOUNT = 20;

export default class UsersRank {
  constructor(userRankContainer, filmsModel) {
    this._userRankContainer = userRankContainer;
    this._filmsModel = filmsModel;

    this._currentUserRank = null;
    this._userRankComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentUserRank = this._getUserRank();

    const prevUserRankComponent = this._userRankComponent;

    this._userRankComponent = new UserProfileView(this._currentUserRank);
    if (prevUserRankComponent === null) {
      render(
        this._userRankContainer,
        this._userRankComponent,
        RenderPosition.BEFOREEND
      );
      return;
    }

    replace(this._userRankComponent, prevUserRankComponent);
    remove(prevUserRankComponent);
  }

  getCurrentUserRank() {
    return this._currentUserRank;
  }

  _handleModelEvent() {
    if (this._currentUserRank === this._getUserRank()) {
      return;
    }

    this.init();
  }

  _getUserRank() {
    const watchedFilmsCount = this._filmsModel
      .getFilms()
      .filter((movie) => movie.isWatched).length;

    if (watchedFilmsCount > MOVIE_BUFF_AMOUNT) {
      return UserRank.MOVIE_BUFF;
    }

    if (watchedFilmsCount > FAN_AMOUNT) {
      return UserRank.FAN;
    }

    if (watchedFilmsCount > NOVICE_AMOUNT) {
      return UserRank.NOVICE;
    }

    return null;
  }
}
