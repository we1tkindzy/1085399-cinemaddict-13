import SortView from "../view/sort.js";
import ListView from "../view/list.js";
import ListEmptyView from "../view/list-empty.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/film-list-container.js";
import FilmCardView from "../view/film-card.js";
import LoadMoreButtonView from "../view/load-more-button.js";
// import StatisticsView from "../view/stats.js";
import PopupPresenter from "./film-popup.js";
// import {updateItem} from "../utils/common.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const FILM_COUNT_PER_STEP = 5;


export default class FilmList {
  constructor(siteMainElement, siteFooterElement) {
    this._siteMainElement = siteMainElement;
    this._siteFooterElement = siteFooterElement;

    this.renderFilmCount = FILM_COUNT_PER_STEP;
    // this._popupPresenter = {};

    this._sortComponent = new SortView();
    this._listComponent = new ListView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerView = new FilmsListContainerView();
    this._listEmptyComponent = new ListEmptyView();

    this._loadMoreButtonComponent = new LoadMoreButtonView();

    // this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(boardFilms, comments) {
    this._boardFilms = boardFilms.slice();
    this._comments = comments.slice();


    render(this._siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);

    render(this._siteMainElement, this._listComponent, RenderPosition.BEFOREEND);
    render(this._listComponent, this._filmsListComponent, RenderPosition.AFTERBEGIN);
    render(this._filmsListComponent, this._filmsListContainerView, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  // _hendelFilmChange(updateFilm) {
  //   this._boardFilms = updateItem(this._boardFilms, updateFilm);
  //   this._popupPresenter[updateFilm.id].init(updateFilm);
  // }

  _renderPopup(filmCardComponent, filmsArr) {
    const popupPresenter = new PopupPresenter(this._siteFooterElement); //  , this._handleFilmChange
    popupPresenter.init(filmCardComponent, filmsArr, this._comments);
    // this._popupPresenter[filmsArr.id] = popupPresenter;
  }


  _renderFilmCards(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((film) => {
        const filmCardComponent = new FilmCardView(film);
        render(this._filmsListContainerView, filmCardComponent, RenderPosition.BEFOREEND);
        this._renderPopup(filmCardComponent, film);
      });
  }

  _renderListEmpty() {
    render(this._siteMainElement, this._listEmptyComponent, RenderPosition.BEFOREEND);
  }

  _handleLoadMoreButtonClick() {
    this._renderFilmCards(this.renderFilmCount, this.renderFilmCount + FILM_COUNT_PER_STEP);
    this.renderFilmCount += FILM_COUNT_PER_STEP;

    if (this.renderFilmCount >= this._boardFilms.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._filmsListComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }


  // _clearFilmsList() {
  //   Object
  //     .values(this._popupPresenter)
  //     .forEach((presenter) => presenter.destroy());
  //   this._popupPresenter = {};
  //   this.renderFilmCount = FILM_COUNT_PER_STEP;
  //   remove(this._loadMoreButtonComponent)
  // }

  _renderFilmsList() {
    this._renderFilmCards(0, Math.min(this._boardFilms.length, FILM_COUNT_PER_STEP));

    if (this._boardFilms.length > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderBoard() {
    if (this._boardFilms.every((film) => film.length)) {
      this._renderListEmpty();
      return;
    }

    this._renderFilmsList();
  }
}