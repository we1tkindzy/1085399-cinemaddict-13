import MenuView from "./view/menu.js";
import StatisticsView from "./view/stats.js";
import FilmsAmountView from "./view/films-amount.js";
import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filter.js";
import UserRankPresenter from "./presenter/user-rank.js";
import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition, replace} from "./utils/render.js";
import {MenuItem, UpdateType} from "./utils/const.js";
import Api from "./api.js";


const AUTHORIZATION = `Basic sfffertehhg27j3`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer__statistics`);


const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();

const filterModel = new FilterModel();

const userRankPresenterPresenter = new UserRankPresenter(siteHeaderElement, filmsModel);
userRankPresenterPresenter.init();

const menuComponent = new MenuView();


let statisticsComponent = null;


const boardPresenter = new BoardPresenter(siteMainElement, siteFooterElement, filmsModel, filterModel, api);
const filterPresenter = new FilterPresenter(menuComponent, filterModel, filmsModel);


const handleSiteMenuClick = (menuItem) => {
  if (menuItem !== MenuItem.STATS) {
    statisticsComponent.hide();
    boardPresenter.show();
    return;
  }

  let prevStatisticsComponent = statisticsComponent;
  const watchedFilms = filmsModel.getFilms().filter((film) => film.isWatched === true);
  const currentUserRank = userRankPresenterPresenter.getCurrentUserRank();
  statisticsComponent = new StatisticsView(watchedFilms, currentUserRank);

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


filterPresenter.init();
boardPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    render(siteMainElement, menuComponent, RenderPosition.AFTERBEGIN);
    render(siteFooterElement, new FilmsAmountView(filmsModel._films.length), RenderPosition.BEFOREEND);
    menuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
    render(siteMainElement, menuComponent, RenderPosition.AFTERBEGIN);
    render(siteFooterElement, new FilmsAmountView(filmsModel._films.length), RenderPosition.BEFOREEND);
    menuComponent.setMenuClickHandler(handleSiteMenuClick);
  });
