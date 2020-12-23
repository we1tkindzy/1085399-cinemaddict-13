import ProfileView from "./view/profile.js";
import MainNavigationView from "./view/navigation.js";
import StatisticsView from "./view/stats.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import BoardPresenter from "./presenter/film-list.js";
import {render, RenderPosition} from "./utils/render.js";


const FILM_COUNT = 10;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const countOfFilms = generateFilter(films);


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer__statistics`);


render(siteHeaderElement, new ProfileView(), RenderPosition.BEFOREEND);


render(siteMainElement, new MainNavigationView(filters), RenderPosition.BEFOREEND);
// render(siteMainElement, new UsersRankView(), RenderPosition.BEFOREEND);


const boardPresenter = new BoardPresenter(siteMainElement, siteFooterElement);
boardPresenter.init(films);

render(siteFooterElement, new StatisticsView(countOfFilms[0]), RenderPosition.BEFOREEND);
