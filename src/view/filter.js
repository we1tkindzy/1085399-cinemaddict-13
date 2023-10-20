import AbstractView from "./abstract.js";
import { MenuItem } from "../utils/const.js";

const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name, count } = filter;

  const countType =
    type === `all`
      ? ``
      : `<span class="main-navigation__item-count">${count}</span>`;

  return `<a href="#${type}" class="main-navigation__item ${
    type === currentFilterType ? `main-navigation__item--active` : ``
  }" date-type="${MenuItem.FILMS}">${name}
      ${countType}
    </a>`;
};

export const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join(``);

  return `<div class="main-navigation__items">
    ${filterItemsTemplate}
  </div>`;
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;

    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    const filterName = evt.target.textContent.split(`\n`, 1)[0];
    const filterType = this._filters.filter(
      (element) => element.name === filterName
    )[0].type;
    this._callback.filterTypeChange(filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
