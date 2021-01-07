import SortView from "../view/sort.js";
import ListView from "../view/list.js";
import ListEmptyView from "../view/list-empty.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/film-list-container.js";
// import FilmCardView from "../view/film-card.js";
import LoadMoreButtonView from "../view/load-more-button.js";
import FilmPresenter from "./film-card.js";
import {sortFilmDateUp, sortFilmRating} from "../utils/common.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {SortType, UpdateType, UserAction} from "../utils/const.js";
import {filter} from "../utils/filter.js";

const FILM_COUNT_PER_STEP = 5;


export default class FilmList {
  constructor(siteMainElement, siteFooterElement, filmsModel, filterModel) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._siteMainElement = siteMainElement;
    this._siteFooterElement = siteFooterElement;

    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = null;
    this._loadMoreButtonComponent = null;


    this._listComponent = new ListView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerView = new FilmsListContainerView();
    this._listEmptyComponent = new ListEmptyView();


    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handelModelChange = this._handelModelChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderBoard();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[filterType](films);

    // this._filmsModel.getFilms()  .slice()
    switch (this._currentSortType) {
      // case SortType.DEFAULT:
      //   return filtredFilms
      case SortType.DATE:
        return filtredFilms.sort(sortFilmDateUp);
      case SortType.RATING:
        return filtredFilms.sort(sortFilmRating);
    }

    return filtredFilms;
  }

  _handelModelChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }


  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      // case UserAction.ADD_COMMENT:
      //   this._filmsModel.addComment(updateType, update);
      //   break;
      // case UserAction.DELETE_COMMENT:
      //   this._filmsModel.deleteComment(updateType, update);
      //   break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard({resetRenderedFilmCount: true});
    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);

    render(this._siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmsListContainerView, this._siteFooterElement, this._handleViewAction, this._handelModelChange);
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
    const filmCount = this._getFilms().length;

    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilmCards(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }

    this._loadMoreButtonComponent = new LoadMoreButtonView();

    render(this._filmsListComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }


  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._sortComponent);
    remove(this._listEmptyComponent);
    remove(this._loadMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderBoard() {
    this._renderSort();

    render(this._siteMainElement, this._listComponent, RenderPosition.BEFOREEND);
    render(this._listComponent, this._filmsListComponent, RenderPosition.AFTERBEGIN);
    render(this._filmsListComponent, this._filmsListContainerView, RenderPosition.BEFOREEND);

    const films = this._getFilms();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderListEmpty();
      return;
    }

    this._renderFilmCards(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));

    if (filmCount > this._renderedFilmCount) {
      this._renderLoadMoreButton();
    }
  }
}
