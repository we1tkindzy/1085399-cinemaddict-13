import SortView from "../view/sort.js";
import ListView from "../view/list.js";
import ListEmptyView from "../view/list-empty.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/film-list-container.js";
// import FilmCardView from "../view/film-card.js";
import LoadMoreButtonView from "../view/load-more-button.js";
import FilmPresenter from "./film-card.js";
import {updateItem, sortFilmDateUp, sortFilmRating} from "../utils/common.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {SortType} from "../utils/const.js";

const FILM_COUNT_PER_STEP = 5;


export default class FilmList {
  constructor(siteMainElement, siteFooterElement, filmsModel) {
    this._filmsModel = filmsModel;
    this._siteMainElement = siteMainElement;
    this._siteFooterElement = siteFooterElement;

    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = new SortView();
    this._listComponent = new ListView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerView = new FilmsListContainerView();
    this._listEmptyComponent = new ListEmptyView();

    this._loadMoreButtonComponent = new LoadMoreButtonView();

    this._handelFilmChange = this._handelFilmChange.bind(this);
    this._handelModelChange = this._handelModelChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {


    this._renderSort();

    render(this._siteMainElement, this._listComponent, RenderPosition.BEFOREEND);
    render(this._listComponent, this._filmsListComponent, RenderPosition.AFTERBEGIN);
    render(this._filmsListComponent, this._filmsListContainerView, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filmsModel.getFilms().slice().sort(sortFilmDateUp);
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortFilmRating);
    }

    return this._filmsModel.getFilms();
  }

  _handelModelChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handelFilmChange(updatedFilm) {
    // this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  // _sortFilms(sortType) {
  //   switch (sortType) {
  //     case SortType.DATE:
  //       this._boardFilms.sort(sortFilmDateUp);
  //       break;
  //     case SortType.RATING:
  //       this._boardFilms.sort(sortFilmRating);
  //       break;
  //     default:
  //       this._boardFilms = this._sourceBoardFilms.slice();
  //   }

  //   this._currentSortType = sortType;
  // }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmsList();
    this._renderFilmsList();
  }

  _renderSort() {
    render(this._siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmsListContainerView, this._siteFooterElement, this._handelFilmChange, this._handelModelChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }


  _renderFilmCards(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderListEmpty() {
    render(this._siteMainElement, this._listEmptyComponent, RenderPosition.BEFOREEND);
  }

  _handleLoadMoreButtonClick() {
    // this._renderFilmCards(this.renderFilmCount, this.renderFilmCount + FILM_COUNT_PER_STEP);
    // this.renderFilmCount += FILM_COUNT_PER_STEP;
    const filmCount = this._getFilms().length;

    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilmCards(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this.renderFilmCount >= filmCount) {
      remove(this._loadMoreButtonComponent);
    }
    ////////
  }

  _renderLoadMoreButton() {
    render(this._filmsListComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }


  _clearFilmsList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this.renderFilmCount = FILM_COUNT_PER_STEP;
    remove(this._loadMoreButtonComponent);
  }

  _renderFilmsList() {
    // this._renderFilmCards(0, Math.min(this._boardFilms.length, FILM_COUNT_PER_STEP));

    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILM_COUNT_PER_STEP));

    this._renderFilmCards(films);

    if (filmCount > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderBoard() {
    if (this._getFilms().every((film) => film.length)) {
      this._renderListEmpty();
      return;
    }

    this._renderFilmsList();
  }
}
