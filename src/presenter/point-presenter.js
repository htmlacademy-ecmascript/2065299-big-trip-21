import EventEditView from '../view/event-edit-view';
import PointView from '../view/point-view';

import { render, replace } from '../framework/render';

export default class PointPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;

  #pointComponent = null;
  #editPointComponent = null;
  #point = null;

  constructor({container, destinationsModel, offersModel }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(point) {
    this.#point = point;

    this.#pointComponent = new PointView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onEditBtnClick: this.#handleEditBtnClick,
    });

    this.#editPointComponent = new EventEditView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onFormSubmit: this.#handleFormSubmit,
      onHideBtnClick: this.#handleHideBtnClick
    });

    render(this.#pointComponent, this.#container);
  }

  #replacePointToForm() {
    replace(this.#editPointComponent, this.#pointComponent);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#editPointComponent);
  }

  #escKeyDownHandler(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  }

  #handleEditBtnClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };

  #handleHideBtnClick = () => {
    this.#replaceFormToPoint();
  };
}
