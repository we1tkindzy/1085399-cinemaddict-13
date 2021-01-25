import AbstractView from "./abstract.js";
import {MenuItem} from "../utils/const.js";


export const createMenuTemplate = () => {
  return `<nav class="main-navigation">

    <a href="#stats" class="main-navigation__additional" data-type="${MenuItem.STATS}">Stats</a>
  </nav>`;
};

export default class Menu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }


  _menuClickHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();

    const buttonStats = this.getElement().querySelector(`[data-type="${MenuItem.STATS}"]`);


    const isActive = buttonStats.classList.contains(`main-navigation__additional--active`);

    if (evt.target.dataset.type === MenuItem.STATS && isActive) {
      return;
    }

    if (evt.target.dataset.type !== MenuItem.STATS && !isActive) {
      return;
    }

    buttonStats.classList.toggle(`main-navigation__additional--active`);
    this._callback.menuClick(evt.target.dataset.type);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[data-type=${menuItem}]`);

    if (item !== null) {
      if (item.classList === `main-navigation__additional`) {
        item.classList.add(`main-navigation__additional--active`);
      }
    }
  }
}
