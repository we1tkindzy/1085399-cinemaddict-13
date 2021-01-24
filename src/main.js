import ProfileView from "./view/profile.js";
import MenuView from "./view/menu.js";
import StatisticsView from "./view/stats.js";
import FilmsAmountView from "./view/films-amount.js";
import {generateFilm} from "./mock/film.js";
import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filter.js";
import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition, replace} from "./utils/render.js";
import {MenuItem} from "./utils/const.js";


const FILM_COUNT = 10;

const films = new Array(FILM_COUNT).fill().map(generateFilm);


const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer__statistics`);


render(siteHeaderElement, new ProfileView(), RenderPosition.BEFOREEND);

const menuComponent = new MenuView();
render(siteMainElement, menuComponent, RenderPosition.BEFOREEND);


let statisticsComponent = null;


const boardPresenter = new BoardPresenter(siteMainElement, siteFooterElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(menuComponent, filterModel, filmsModel);


const handleSiteMenuClick = (menuItem) => {
  if (menuItem !== MenuItem.STATS) {
    statisticsComponent.hide();
    boardPresenter.show();
    return;
  }

  let prevStatisticsComponent = statisticsComponent;
  const watchedFilms = filmsModel.getFilms().filter((film) => film.isWatched === true);
  statisticsComponent = new StatisticsView(watchedFilms);

  if (prevStatisticsComponent === null) {
    boardPresenter.hide();
    render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
    filterPresenter.resetActiveFilter();
    return;
  }

  replace(statisticsComponent, prevStatisticsComponent);

  boardPresenter.hide();
  statisticsComponent.show();
  filterPresenter.resetActiveFilter();
};

menuComponent.setMenuClickHandler(handleSiteMenuClick);


filterPresenter.init();
boardPresenter.init();


const countOfFilms = filmsModel._films.length;
render(siteFooterElement, new FilmsAmountView(countOfFilms), RenderPosition.BEFOREEND);
