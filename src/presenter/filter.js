import FilterView from "../view/filter.js";
import { render, RenderPosition, replace, remove } from "../utils/render.js";
import { filter } from "../utils/filter.js";
import { FilterType, UpdateType } from "../utils/const.js";

export default class Filter {
  constructor(filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init(isFilterReset = false) {
    if (isFilterReset) {
      this._currentFilter = null;
    } else {
      this._currentFilter = this._filterModel.getFilter();
    }

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(
      this._handleFilterTypeChange
    );

    if (prevFilterComponent === null) {
      render(
        this._filterContainer,
        this._filterComponent,
        RenderPosition.AFTERBEGIN
      );
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  resetActiveFilter() {
    this.init(true);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL,
        name: `All movies`,
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: `Watchlist`,
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.WATCHED,
        name: `History`,
        count: filter[FilterType.WATCHED](films).length,
      },
      {
        type: FilterType.FAVORITE,
        name: `Favorites`,
        count: filter[FilterType.FAVORITE](films).length,
      },
    ];
  }
}
