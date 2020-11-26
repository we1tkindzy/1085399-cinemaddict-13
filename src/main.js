import {ctreatesProfileTemplate} from "./view/profile.js";
import {cratesMainNavigationTemplate} from "./view/navigation.js";
import {createsUsersRankTemplate} from "./view/rank.js";
import {createsSortTemplate} from "./view/sort.js";
import {createsListTemplate} from "./view/list.js";
import {createsFilmCardTemplate} from "./view/film-card.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {createsStatisticsTemplate} from "./view/stats.js";
// import {createsPopupTemplate} from "./view/popup.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";


const FILM_COUNT = 10;
const FILM_COUNT_PER_STEP = 5;
const FILM_EXTRA_COUNT = 2;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

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


const filmsListExtraElement = document.querySelectorAll(`.films-list--extra`);
for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
  const filmsListExtraContainerElement = filmsListExtraElement[i].querySelector(`.films-list__container`);
  for (i = 0; i < FILM_EXTRA_COUNT; i++) {
    render(filmsListExtraContainerElement, createsFilmCardTemplate(), `beforeend`);
  }
}


const siteFooterElement = document.querySelector(`.footer__statistics`);
render(siteFooterElement, createsStatisticsTemplate(), `beforeend`);
// render(siteFooterElement, createsPopupTemplate(), `beforeend`);
