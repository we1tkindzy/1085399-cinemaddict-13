import ProfileView from "./view/profile.js";
import MainNavigationView from "./view/navigation.js";
// import UsersRankView from "./view/rank.js";
import SortView from "./view/sort.js";
import ListView from "./view/list.js";
import ListEmptyView from "./view/list-empty.js";
import FilmsListView from "./view/films-list.js";
import {createsFilmsListExtraTemplate} from "./view/films-list-extra.js";
import FilmCardView from "./view/film-card.js";
import LoadMoreButtonView from "./view/load-more-button.js";
import StatisticsView from "./view/stats.js";
import PopupView from "./view/popup.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {generateComment} from "./mock/comments.js";
import {renderTemplate, render, RenderPosition, remove, appendChild, removeChild} from "./utils/render.js";


const FILM_COUNT = 10;
const FILM_COUNT_PER_STEP = 5;
const FILM_COMMENT_COUNT = 5;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const countOfFilms = generateFilter(films);
const comments = new Array(FILM_COMMENT_COUNT).fill().map(generateComment);


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer__statistics`);


render(siteHeaderElement, new ProfileView(), RenderPosition.BEFOREEND);


render(siteMainElement, new MainNavigationView(filters), RenderPosition.BEFOREEND);
// render(siteMainElement, new UsersRankView(), RenderPosition.BEFOREEND);


if (films.every((film) => film.length)) {
  render(siteMainElement, new ListEmptyView(), RenderPosition.BEFOREEND);
} else {
  render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);
  const listComponent = new ListView();
  render(siteMainElement, listComponent, RenderPosition.BEFOREEND);

  const filmsListComponent = new FilmsListView();
  render(listComponent, filmsListComponent, RenderPosition.BEFOREEND);

  const filmsListElement = document.querySelector(`.films-list`);
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

  const renderPopup = (filmCardComponent, filmsArr) => {
    const popupComponent = new PopupView(filmsArr, comments);
    const body = document.querySelector(`body`);

    const openPopup = () => {
      render(siteFooterElement, popupComponent, RenderPosition.BEFOREEND);
      appendChild(siteFooterElement, popupComponent);
      body.classList.add(`hide-overflow`);
    };
    const closePopup = () => {
      removeChild(siteFooterElement, popupComponent);
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
  };

  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    const filmCardComponent = new FilmCardView(films[i]);
    render(filmsListContainerElement, filmCardComponent, RenderPosition.BEFOREEND);
    renderPopup(filmCardComponent, films[i]);
  }
  if (films.length > FILM_COUNT_PER_STEP) {
    let renderFilmCount = FILM_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButtonView();

    render(filmsListComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      films
        .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => {
          const filmCardComponent = new FilmCardView(film);
          render(filmsListContainerElement, filmCardComponent, RenderPosition.BEFOREEND);
          renderPopup(filmCardComponent, film);
        });

      renderFilmCount += FILM_COUNT_PER_STEP;

      if (renderFilmCount >= films.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }

  renderTemplate(listComponent.getElement(), createsFilmsListExtraTemplate(), RenderPosition.BEFOREEND);
}


render(siteFooterElement, new StatisticsView(countOfFilms[0]), RenderPosition.BEFOREEND);
