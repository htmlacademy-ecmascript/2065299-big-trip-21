import FilterView from '../view/filter-view';
import { filterFunctions } from '../util/filter-functions';
import { render } from '../framework/render';

export default class FilterPresenter {
  #container = null;
  #pointsModel = null;
  #filters = [];

  constructor ({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;

    this.#filters = Object.entries(filterFunctions)
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
