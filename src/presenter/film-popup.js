import PopupView from "../view/popup.js";
import {render, RenderPosition, appendChild, removeChild} from "../utils/render.js";

export default class Card {
  constructor(siteFooterElement) { // , changeData
    this._siteFooterElement = siteFooterElement;
    // this._changeData = changeData;

    this._popupComponent = null;

    this._hendleCardClick = this._hendleCardClick.bind(this);
    this._hendlePopupClick = this._hendlePopupClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);


    // this._hendleAddWatchlisClick = this._hendleAddWatchlisClick.bind(this);
    // this._hendleWatchedClick = this._hendleWatchedClick.bind(this);
    // this._hendleFavoriteClick = this._hendleFavoriteClick.bind(this);
  }

  init(filmCardComponent, filmsArr, comments) {
    this._filmsArr = filmsArr;
    this._filmCardComponent = filmCardComponent;
    this._comments = comments;

    // this._prevPopupComponent = this._popupComponent;

    this._popupComponent = new PopupView(filmsArr, this._comments);
    this._body = document.querySelector(`body`);


    this._filmCardComponent.setPosterClickHandle(this._hendleCardClick);
    this._filmCardComponent.setTitleClickHandle(this._hendleCardClick);
    this._filmCardComponent.setCommentsClickHandle(this._hendleCardClick);
    this._popupComponent.setCloseButtonClickHandle(this._hendlePopupClick);


    // this._filmCardComponent.setAddWatchlisClickHandler(this._hendleAddWatchlisClick);
    // this._filmCardComponent.setWatchedClickHandler(this._hendleWatchedClick);
    // this._filmCardComponent.setFavoriteClickHandler(this._hendleFavoriteClick);
  }

  _openPopup() {
    // if (this._prevPopupComponent === null) {
    //   render(this._siteFooterElement, this._popupComponent, RenderPosition.BEFOREEND);
    //   return;
    // }

    // if (this._siteFooterElement.getElement().contains(this._prevPopupComponent.getElement())) {
    //   replace(this._popupComponent, this._prevPopupComponent);
    // }

    // remove(this._prevPopupComponent);
    render(this._siteFooterElement, this._popupComponent, RenderPosition.BEFOREEND);
    appendChild(this._siteFooterElement, this._popupComponent);
    this._body.classList.add(`hide-overflow`);
  }

  // destroy() {
  //   remove(this._popupComponent);
  // }

  _closePopup() {
    removeChild(this._siteFooterElement, this._popupComponent);
    this._body.classList.remove(`hide-overflow`);
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


  // _hendleAddWatchlisClick() {
  //   this._changeData(
  //     Object.assign(
  //       {},
  //       this._filmsArr,
  //       {
  //         isAddToWatchlist: !this._filmsArr.isAddToWatchlist
  //       }
  //     )
  //   );
  // }

  // _hendleWatchedClick() {
  //   this._changeData(
  //     Object.assign(
  //       {},
  //       this._filmsArr,
  //       {
  //         isWatched: !this._filmsArr.isWatched
  //       }
  //     )
  //   );
  // }

  // _hendleFavoriteClick() {
  //   this._changeData(
  //     Object.assign(
  //       {},
  //       this._filmsArr,
  //       {
  //         isFavorite: !this._filmsArr.isFavorite
  //       }
  //     )
  //   );
  // }

  _hendlePopupClick() { //  film
    // this._changeData(film)
    this._closePopup();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }
}
