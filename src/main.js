import ProfileView from "./view/profile.js";
import MainNavigationView from "./view/navigation.js";
import UsersRankView from "./view/rank.js";
import SortView from "./view/sort.js";
import ListView from "./view/list.js";
import FilmsListView from "./view/films-list.js";
import {createsFilmsListExtraTemplate} from "./view/films-list-extra.js";
import FilmCardView from "./view/film-card.js";
import LoadMoreButtonView from "./view/load-more-button.js";
import StatisticsView from "./view/stats.js";
import PopupView from "./view/popup.js";
// import PopupInfoView from "./view/popup-info.js";
// import PopupCommentsView from "./view/popup-comments.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {generateComment} from "./mock/comments.js";
import {renderTemplate, render, RenderPosition} from "./utils.js";


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


const renderPopup = () => {
  const popupComponent = new PopupView(films[0], comments);

  const filmCardComponent = new FilmCardView(films[0]);
  // console.log(filmCardComponent);
  // console.log(filmCardComponent.getElement());
  // console.log(filmCardComponent.getElement().querySelector(`.film-card__poster`));

  // console.log(popupComponent.getElement());

  const body = document.querySelector(`body`);

  const openPopup = () => {
    render(siteFooterElement, popupComponent.getElement(), RenderPosition.BEFOREEND);
    siteFooterElement.appendChild(popupComponent.getElement());
    body.classList.remove(`hide-overflow`);
  };

  const closePopup = () => {
    siteFooterElement.removeChild(popupComponent.getElement());
    body.classList.add(`hide-overflow`);
  };

  filmCardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    openPopup();
  });
  filmCardComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    openPopup();
  });
  filmCardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    openPopup();
  });

  popupComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    closePopup();
  });
};


render(siteHeaderElement, new ProfileView().getElement(), RenderPosition.BEFOREEND);


render(siteMainElement, new MainNavigationView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new UsersRankView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const listComponent = new ListView();
render(siteMainElement, listComponent.getElement(), RenderPosition.BEFOREEND);

const filmsListComponent = new FilmsListView();
render(listComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);

const filmsListElement = document.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(filmsListContainerElement, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
}
if (films.length > FILM_COUNT_PER_STEP) {
  let renderFilmCount = FILM_COUNT_PER_STEP;

  const loadMoreButtonComponent = new LoadMoreButtonView();

  render(filmsListComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(filmsListContainerElement, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

    renderFilmCount += FILM_COUNT_PER_STEP;

    if (renderFilmCount >= films.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}

renderTemplate(listComponent.getElement(), createsFilmsListExtraTemplate(), RenderPosition.BEFOREEND);


render(siteFooterElement, new StatisticsView(countOfFilms[0]).getElement(), RenderPosition.BEFOREEND);

// const popupComponent = new PopupView(films[0], comments);
// renderPopup(siteFooterElement, films[0]);

renderPopup();
// render(popupComponent.getElement(), new PopupInfoView(films[0]).getElement(), RenderPosition.BEFOREEND);
// render(popupComponent.getElement(), new PopupCommentsView(comments).getElement(), RenderPosition.BEFOREEND);
