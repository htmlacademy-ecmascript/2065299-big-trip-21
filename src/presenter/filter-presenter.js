import FilterView from '../view/filter-view';
import { filterBy } from '../util/filter-by';
import { render, remove, replace } from '../framework/render';
import { UpdateType } from '../util/const';

export default class FilterPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;
  #currentFilter = null;
  #filterComponent = null;

  constructor ({container, pointsModel, filterModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);

  }

  get filters() {
    const points = this.#pointsModel.get();

    return Object.entries(filterBy)
      .map(([filterType, filterPoints]) => ({
        type: filterType,
        isChecked: filterType === this.#currentFilter,
        isDisabled: filterPoints(points).length === 0
      }),);

  }

  init() {
    this.#currentFilter = this.#filterModel.get();
    const filters = this.filters;

    const prevFiltersComponent = this.#filterComponent;
    this.#filterComponent = new FilterView({
      items: filters,
      onItemChange: this.#filterTypesChangeHandler
    });

    if(!prevFiltersComponent) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }

  #filterTypesChangeHandler = (filterType) => {
    this.#filterModel.set(UpdateType.MAJOR, filterType);
  };

  #modelEventHandler = () => {
    this.init();
  };
}
