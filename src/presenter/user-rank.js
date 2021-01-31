import UserProfileView from "../view/user-profile.js";
import {RenderPosition, render, replace, remove} from "../utils/render.js";


const UserRank = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`
};

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
      render(this._userRankContainer, this._userRankComponent, RenderPosition.BEFOREEND);
      return;
    }


    replace(this._userRankComponent, prevUserRankComponent);
    remove(prevUserRankComponent);
  }

  _handleModelEvent() {
    if (this._currentUserRank === this._getUserRank()) {
      return;
    }

    this.init();
  }

  _getUserRank() {
    const watchedFilmsCount = this._filmsModel.getFilms().filter((movie) => movie.isWatched).length;

    if (watchedFilmsCount > 20) {
      return UserRank.MOVIE_BUFF;
    }

    if (watchedFilmsCount > 10) {
      return UserRank.FAN;
    }

    if (watchedFilmsCount > 0) {
      return UserRank.NOVICE;
    }

    return null;
  }

  getCurrentUserRank() {
    return this._currentUserRank;
  }
}
