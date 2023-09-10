import EventsListView from '../view/events-list-view';
import SortView from '../view/sort-view';
import NoPointView from '../view/no-point-view';
import PointPresenter from './point-presenter';
import { render, RenderPosition } from '../framework/render';

export default class BoardPresenter {
  #eventListComponent = new EventsListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();
  #boardContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];

  constructor({boardContainer,
    destinationsModel, offersModel,
    pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#points = [...pointsModel.get()];
  }

  #renderPoint (point) {
    const pointPresenter = new PointPresenter({
      container: this.#eventListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });

    pointPresenter.init(point);
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
