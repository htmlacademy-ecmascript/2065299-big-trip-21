import Observable from '../framework/observable';
import { FilterTypes } from '../util/const';

export default class FilterModel extends Observable {
  #filter = FilterTypes.EVERYTHING;

  get() {
    return this.#filter;
  }

  set(updateType, update) {
    this.#filter = update;
    this._notify(updateType, update);
  }
}
