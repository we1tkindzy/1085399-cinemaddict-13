import {createElement} from "../utils.js";

const createMainNavigationItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<a href="#watchlist" class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}">${name}
      <span class="main-navigation__item-count">${count}</span>
    </a>`
  );
};

export const cratesMainNavigationTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createMainNavigationItemTemplate(filter, index === 0))
    .join(``);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">

      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MainNavigation {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return cratesMainNavigationTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
