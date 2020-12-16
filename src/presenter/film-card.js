import FilmCardView from "../view/film-card.js";
import PopupView from "../view/popup.js";
import {render, RenderPosition, replace, appendChild, removeChild, remove} from "../utils/render.js";

const Mode = {
  CARD: `CARD`,
  POPUP: `POPUP`
};

export default class Card {
  constructor(filmsListContainerView, siteFooterElement, changeData, changeMode) {
    this._filmsListContainerView = filmsListContainerView;
    this._siteFooterElement = siteFooterElement;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._popupComponent = null;
    this._mode = Mode.CARD;

    this._hendleCardClick = this._hendleCardClick.bind(this);
    this._hendlePopupClick = this._hendlePopupClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);


    this._hendleAddWatchlisClick = this._hendleAddWatchlisClick.bind(this);
    this._hendleWatchedClick = this._hendleWatchedClick.bind(this);
    this._hendleFavoriteClick = this._hendleFavoriteClick.bind(this);
  }

  init(film, comments) {
    this._film = film;

    this._prevFilmCardComponent = this._filmCardComponent;
    this._prevPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._popupComponent = new PopupView(film, comments);
    this._body = document.querySelector(`body`);


    this._filmCardComponent.setPosterClickHandler(this._hendleCardClick);
    this._filmCardComponent.setTitleClickHandler(this._hendleCardClick);
    this._filmCardComponent.setCommentsClickHandler(this._hendleCardClick);
    this._popupComponent.setCloseButtonClickHandler(this._hendlePopupClick);


    this._filmCardComponent.setAddWatchlisClickHandler(this._hendleAddWatchlisClick);
    this._filmCardComponent.setWatchedClickHandler(this._hendleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._hendleFavoriteClick);

    // this._popupComponent.setAddWatchlisClickHandler(this._hendleAddWatchlisClick);
    // this._popupComponent.setWatchedClickHandler(this._hendleWatchedClick);
    // this._popupComponent.setFavoriteClickHandler(this._hendleFavoriteClick);

    if (this._prevFilmCardComponent === null || this._prevPopupComponent === null) {
      render(this._filmsListContainerView, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.CARD) {
      replace(this._filmCardComponent, this._prevFilmCardComponent);
    }

    if (this._mode === Mode.POPUP) {
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


  _openPopup() {
    render(this._siteFooterElement, this._popupComponent, RenderPosition.BEFOREEND);
    appendChild(this._siteFooterElement, this._popupComponent);
    this._body.classList.add(`hide-overflow`);
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _closePopup() {
    removeChild(this._siteFooterElement, this._popupComponent);
    this._body.classList.remove(`hide-overflow`);
    this._mode = Mode.CARD;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _hendleCardClick() {
    this._openPopup();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }


  _hendleAddWatchlisClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isAddToWatchlist: !this._film.isAddToWatchlist
            }
        )
    );
  }

  _hendleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _hendleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _hendlePopupClick() {
    this._closePopup();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }
}
