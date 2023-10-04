import AbstractView from '../framework/view/abstract-view';
import { NoPointText } from '../util/const';

function createNoPointTemplate({text}) {
  return /*html*/ `
      <p class="trip-events__msg">${text}</p>
    `;
}

export default class NoPointView extends AbstractView{
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate({text: NoPointText[(this.#filterType).toUpperCase()]});
  }
}
