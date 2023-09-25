import FilterView from '../view/filter-view';
import { filterBy } from '../util/filter-by';
import { render } from '../framework/render';

export default class FilterPresenter {
  #container = null;
  #pointsModel = null;
  #filters = [];

  constructor ({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;

    this.#filters = Object.entries(filterBy)
      .map(([filterType, filterPoints], index) => ({
        type: filterType,
        isChecked: index === 0,
        isDisabled: filterPoints(this.#pointsModel.get()).length === 0
      }),);
  }

  init() {
    render(new FilterView({items: this.#filters}), this.#container);
  }
}
