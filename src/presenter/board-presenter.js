import EventsListView from '../view/events-list-view';
import SortView from '../view/sort-view';
import NoPointView from '../view/no-point-view';
import PointPresenter from './point-presenter';
import { render, RenderPosition } from '../framework/render';
import { updateItem } from '../util/common';

export default class BoardPresenter {
  #eventListComponent = new EventsListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();
  #boardContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];

  #pointPresenters = new Map();

  constructor({boardContainer,
    destinationsModel, offersModel,
    pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#points = [...pointsModel.get()];
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint (point) {
    const pointPresenter = new PointPresenter({
      container: this.#eventListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPointsContainer() {
    render(this.#eventListComponent, this.#boardContainer);
  }

  #renderPoints() {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderNoPoint() {
    render(this.#noPointComponent, this.#boardContainer);
  }

  #renderBoard() {
    if(this.#points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    this.#renderPointsContainer();
    this.#renderPoints();
  }

  init() {
    this.#renderBoard();
  }
}
