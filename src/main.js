import {ctreatesProfileTemplate} from "./view/profile.js";
import {cratesMainNavigationTemplate} from "./view/navigation.js";
import {createsUsersRankTemplate} from "./view/rank.js";
import {createsSortTemplate} from "./view/sort.js";
import {createsListTemplate} from "./view/list.js";
import {createsFilmCardTemplate} from "./view/film-card.js";
import {createsStatisticsTemplate} from "./view/stats";
import {createsPopupTemplate} from "./view/popup.js";

const LIST_COUNT = 5;
const LIST_EXTRA_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, ctreatesProfileTemplate(), `beforeend`);


const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, cratesMainNavigationTemplate(), `beforeend`);
render(siteMainElement, createsUsersRankTemplate(), `beforeend`);
render(siteMainElement, createsSortTemplate(), `beforeend`);
render(siteMainElement, createsListTemplate(), `beforeend`);

const filmsListElement = document.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
for (let i = 0; i < LIST_COUNT; i++) {
  render(filmsListContainerElement, createsFilmCardTemplate(), `beforeend`);
}

const filmsListExtraElement = document.querySelectorAll(`.films-list--extra`);
for (let i = 0; i < LIST_EXTRA_COUNT; i++) {
  const filmsListExtraContainerElement = filmsListExtraElement[i].querySelector(`.films-list__container`);
  for (i = 0; i < LIST_EXTRA_COUNT; i++) {
    render(filmsListExtraContainerElement, createsFilmCardTemplate(), `beforeend`);
  }
}


const siteFooterElement = document.querySelector(`.footer__statistics`);
render(siteFooterElement, createsStatisticsTemplate(), `beforeend`);
render(siteFooterElement, createsPopupTemplate(), `beforeend`);
