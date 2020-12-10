import SortView from "../view/sort.js";
import ListView from "../view/list.js";
import ListEmptyView from "../view/list-empty.js";
import FilmsListView from "../view/films-list.js";
import {createsFilmsListExtraTemplate} from "../view/films-list-extra.js";
import FilmCardView from "../view/film-card.js";
import LoadMoreButtonView from "../view/load-more-button.js";
// import StatisticsView from "../view/stats.js";
import PopupView from "../view/popup.js";
import {renderTemplate, render, RenderPosition, remove, appendChild, removeChild} from "../utils/render.js";

const FILM_COUNT_PER_STEP = 5;


export default class FilmList {
  constructor(siteMainElement, siteFooterElement) {
    this._siteMainElement = siteMainElement;
    this._siteFooterElement = siteFooterElement;

    this._sortComponent = new SortView();
    this._listEmptyComponent = new ListEmptyView();
    this._listComponent = new ListView();
    this._filmsListComponent = new FilmsListView();


    this._renderFilmsListExtra = createsFilmsListExtraTemplate();
  }

  init(boardFilms, comments) {
    this._boardFilms = boardFilms.slice();
    this._comments = comments.slice();


    this._renderBoard();
  }

  _renderSort() {
    render(this._siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
  }


  _renderFilmsList() {
    render(this._listComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
  }

  _renderPopup(filmCardComponent, filmsArr) {
    const popupComponent = new PopupView(filmsArr, this._comments);
    const body = document.querySelector(`body`);

    const openPopup = () => {
      render(this._siteFooterElement, popupComponent, RenderPosition.BEFOREEND);
      appendChild(this._siteFooterElement, popupComponent);
      body.classList.add(`hide-overflow`);
    };
    const closePopup = () => {
      removeChild(this._siteFooterElement, popupComponent);
      body.classList.remove(`hide-overflow`);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmCardComponent.setPosterClickHandle(() => {
      openPopup();
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    filmCardComponent.setTitleClickHandle(() => {
      openPopup();
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    filmCardComponent.setCommentsClickHandle(() => {
      openPopup();
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    popupComponent.setCloseButtonClickHandle(() => {
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
  }


  _renderFilmCards(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((film) => {
        const filmCardComponent = new FilmCardView(film);
        const filmsListContainerElement = document.querySelector(`.films-list`).querySelector(`.films-list__container`);
        render(filmsListContainerElement, filmCardComponent, RenderPosition.BEFOREEND);
        this._renderPopup(filmCardComponent, film);
      });
  }

  _renderListEmpty() {
    render(this._siteMainElement, this._listEmptyComponent, RenderPosition.BEFOREEND);
  }

  _renderLoadMoreButton() {
    let renderFilmCount = FILM_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButtonView();

    render(this._filmsListComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      this._boardFilms
        .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => {
          const filmCardComponent = new FilmCardView(film);
          const filmsListContainerElement = document.querySelector(`.films-list`).querySelector(`.films-list__container`);
          render(filmsListContainerElement, filmCardComponent, RenderPosition.BEFOREEND);
          this._renderPopup(filmCardComponent, film);
        });

      renderFilmCount += FILM_COUNT_PER_STEP;

      if (renderFilmCount >= this._boardFilms.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }

  _renderFilmsListExtra() {
    renderTemplate(this._listComponent.getElement(), this._renderFilmsListExtra, RenderPosition.BEFOREEND);
  }

  _renderList() {
    this._renderFilmCards(0, Math.min(this._boardFilms.length, FILM_COUNT_PER_STEP));

    if (this._boardFilms.length > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }

    // this._renderFilmsListExtra();
  }

  _renderBoard() {
    if (this._boardFilms.every((film) => film.length)) {
      this._renderListEmpty();
      return;
    }

    this._renderList();
  }
}
