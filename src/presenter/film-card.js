import FilmCardView from "../view/film-card.js";
import PopupView from "../view/popup.js";
import CommentsModel from "../model/comments.js";
import {render, RenderPosition, replace, appendChild, removeChild, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../utils/const.js";


const Mode = {
  CARD: `CARD`,
  POPUP: `POPUP`
};

export default class FilmCard {
  constructor(filmsListContainerView, siteFooterElement, changeData, changeMode, api) {
    this._filmsListContainerView = filmsListContainerView;
    this._siteFooterElement = siteFooterElement;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._api = api;

    this._filmCardComponent = null;
    this._popupComponent = null;
    this._mode = Mode.CARD;

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handlePopupClick = this._handlePopupClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);


    this._handleAddWatchlisClick = this._handleAddWatchlisClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);


    this._handleAddWatchlisPopupClick = this._handleAddWatchlisPopupClick.bind(this);
    this._handleWatchedPopupClick = this._handleWatchedPopupClick.bind(this);
    this._handleFavoritePopupClick = this._handleFavoritePopupClick.bind(this);

    this._commentsModel = new CommentsModel();

    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
    this._handleAddCommentClick = this._handleAddCommentClick.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._commentsModel.addObserver(this._handleModelEvent);
  }

  init(film) {
    this._film = film;


    this._prevFilmCardComponent = this._filmCardComponent;
    this._prevPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._popupComponent = new PopupView(film, this._commentsModel.getComments());
    this._body = document.querySelector(`body`);


    this._filmCardComponent.setPosterClickHandler(this._handleCardClick);
    this._filmCardComponent.setTitleClickHandler(this._handleCardClick);
    this._filmCardComponent.setCommentsClickHandler(this._handleCardClick);
    this._popupComponent.setCloseButtonClickHandler(this._handlePopupClick);

    this._popupComponent.setDeleteClickHandler(this._handleDeleteCommentClick);
    this._popupComponent.setAddCommentHandler(this._handleAddCommentClick);

    this._filmCardComponent.setAddWatchlisClickHandler(this._handleAddWatchlisClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);


    this._popupComponent.setAddWatchlisClickHandler(this._handleAddWatchlisPopupClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedPopupClick);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoritePopupClick);

    if (this._prevFilmCardComponent === null || this._prevPopupComponent === null) {
      render(this._filmsListContainerView, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.CARD) {
      replace(this._filmCardComponent, this._prevFilmCardComponent);
    }

    if (this._mode === Mode.POPUP) {
      replace(this._filmCardComponent, this._prevFilmCardComponent);
      replace(this._popupComponent, this._prevPopupComponent);
    }

    remove(this._prevFilmCardComponent);
    remove(this._prevPopupComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popupComponent);
  }

  resetView() {
    if (this._mode !== Mode.CARD) {
      this._closePopup();
    }
  }

  setAborting() {
    const resetPopupState = () => {
      this._popupComponent.updateData({isDisabled: false, deletingCommentId: null});
      this._popupComponent.moveScrollDown();
    };

    this._popupComponent.shake(resetPopupState);
  }


  _openPopup() {
    render(this._siteFooterElement, this._popupComponent, RenderPosition.BEFOREEND);
    appendChild(this._siteFooterElement, this._popupComponent);
    this._body.classList.add(`hide-overflow`);
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _closePopup() {
    removeChild(this._siteFooterElement, this._popupComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._body.classList.remove(`hide-overflow`);
    this._mode = Mode.CARD;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._popupComponent.reset(this._film);
      this._closePopup();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handleCardClick() {
    this._openPopup();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._api.getComments(this._film.id)
      .then((comments) => this._commentsModel.setComments(comments))
      .then(() => this.init(this._film))
      .catch(() => this._commentsModel.setComments([]));
  }


  _handleAddWatchlisClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isAddToWatchlist: !this._film.isAddToWatchlist
            }
        )
    );
  }

  _handleWatchedClick() {
    const updatedMovie = Object.assign(
        {},
        this._film,
        {isWatched: !this._film.isWatched}
    );

    if (updatedMovie.isWatched && updatedMovie.watchingDate === null) {
      updatedMovie.watchingDate = new Date();
    }

    if (updatedMovie.watchingDate && !updatedMovie.isWatched) {
      updatedMovie.watchingDate = null;
    }

    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        updatedMovie
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }


  _handleAddWatchlisPopupClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {isAddToWatchlist: !this._film.isAddToWatchlist}
        )
    );
  }

  _handleWatchedPopupClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {isWatched: !this._film.isWatched}
        )
    );
  }

  _handleFavoritePopupClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {isFavorite: !this._film.isFavorite}
        )
    );
  }


  _handleDeleteCommentClick(commentId) {
    this._popupComponent.updateData({isDisabled: true, deletingCommentId: commentId});
    this._handleModelEvent(
        UserAction.DELETE_COMMENT,
        UpdateType.PATCH,
        commentId
    );
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        this._film
    );
  }

  _handleAddCommentClick(newComment) {
    this._popupComponent.updateData({isDisabled: true});
    this._handleModelEvent(
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        newComment
    );
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        this._film
    );
  }


  _handleModelEvent(userAction, updateType, update) {
    switch (userAction) {
      case UserAction.ADD_COMMENT: {
        this._api.addComment(this._film.id, update).then((response) => {
          this._commentsModel.addComment(updateType, response);
        })
        .catch(() => {
          this.setAborting();
        });
        break;
      }
      case UserAction.DELETE_COMMENT: {
        this._api.deleteComment(update).then(() => {
          this._commentsModel.deleteComment(updateType, update);
        })
        .catch(() => {
          this.setAborting();
        });
        break;
      }
    }
  }

  _handlePopupClick() {
    this._closePopup();
  }
}
