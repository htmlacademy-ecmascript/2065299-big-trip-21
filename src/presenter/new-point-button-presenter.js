import NewPointButtonVeiw from '../view/new-point-button-view';
import {render} from '../framework/render.js';

export default class NewPointButtonPresenter {
  #container = null;
  #button = null;
  #handleButtonClick = null;

  constructor({container}) {
    this.#container = container;
  }

  init({onButtonClick}) {
    this.#handleButtonClick = onButtonClick;
    this.#button = new NewPointButtonVeiw({onButtonClick: this.#buttonClickHandler});
    render(this.#button, this.#container);
  }

  disableButton() {
    this.#button.setDisabled(true);
  }

  enableButton() {
    this.#button.setDisabled(false);
  }

  #buttonClickHandler = () => {
    this.#handleButtonClick();
  };
}