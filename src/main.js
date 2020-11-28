import {ctreatesProfileTemplate} from "./view/profile.js";
import {cratesMainNavigationTemplate} from "./view/navigation.js";
import {createsUsersRankTemplate} from "./view/rank.js";
import {createsSortTemplate} from "./view/sort.js";
import {createsListTemplate} from "./view/list.js";
import {createsFilmCardTemplate} from "./view/film-card.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {createsStatisticsTemplate} from "./view/stats.js";
import {createsPopupTemplate} from "./view/popup.js";
import {createCommentsListTemplate} from "./view/comments.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {generateComment} from "./mock/comments.js";


const FILM_COUNT = 10;
const FILM_COUNT_PER_STEP = 5;
const FILM_COMMENT_COUNT = 5;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const countOfFilms = generateFilter(films);
const comments = new Array(FILM_COMMENT_COUNT).fill().map(generateComment);


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, ctreatesProfileTemplate(), `beforeend`);


const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, cratesMainNavigationTemplate(filters), `beforeend`);
render(siteMainElement, createsUsersRankTemplate(), `beforeend`);
render(siteMainElement, createsSortTemplate(), `beforeend`);
render(siteMainElement, createsListTemplate(), `beforeend`);

const filmsListElement = document.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(filmsListContainerElement, createsFilmCardTemplate(films[i]), `beforeend`);
}
if (films.length > FILM_COUNT_PER_STEP) {
  let renderFilmCount = FILM_COUNT_PER_STEP;

  render(filmsListContainerElement, createLoadMoreButtonTemplate(), `beforeend`);

  const loadMoreButton = filmsListContainerElement.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(filmsListContainerElement, createsFilmCardTemplate(film), `beforeend`));

    renderFilmCount += FILM_COUNT_PER_STEP;

    if (renderFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}


const siteFooterElement = document.querySelector(`.footer__statistics`);
render(siteFooterElement, createsStatisticsTemplate(countOfFilms[0]), `beforeend`);
render(siteFooterElement, createsPopupTemplate(films[0]), `beforeend`);

const filmsCommentsTitleElement = siteFooterElement.querySelector(`.film-details__comments-title`);
render(filmsCommentsTitleElement, createCommentsListTemplate(comments), `beforeend`);
