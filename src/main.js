import ProfileView from "./view/profile.js";
import {generateFilm} from "./mock/film.js";
// import {generateFilter} from "./mock/filter.js";
import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filter.js";
import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition} from "./utils/render.js";


const FILM_COUNT = 10;

const films = new Array(FILM_COUNT).fill().map(generateFilm);

// const countOfFilms = generateFilter(films);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer__statistics`);


render(siteHeaderElement, new ProfileView(), RenderPosition.BEFOREEND);


// render(siteMainElement, new UsersRankView(), RenderPosition.BEFOREEND);


const boardPresenter = new BoardPresenter(siteMainElement, siteFooterElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);


filterPresenter.init();
boardPresenter.init();

// render(siteFooterElement, new StatisticsView(countOfFilms[0]), RenderPosition.BEFOREEND);
