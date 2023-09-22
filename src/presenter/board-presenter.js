import EventsListView from '../view/events-list-view';
import SortView from '../view/sort-view';
import NoPointView from '../view/no-point-view';
import PointPresenter from './point-presenter';
import { render, RenderPosition, replace, remove } from '../framework/render';
import { updateItem } from '../util/common';
import { SortTypes } from '../mocks/const';
import { enabledSortType } from '../mocks/const';
import { sortBy } from '../util/sort-by';

export default class BoardPresenter {
  #eventListComponent = new EventsListView();
  #sortComponent = null;
  #noPointComponent = new NoPointView();
  #boardContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = [];
  #defaultSortType = SortTypes.DAY;
  #currentSortType = SortTypes.DAY;


  #pointPresenters = new Map();

  constructor({boardContainer, destinationsModel, offersModel, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#points = [...pointsModel.get()];
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };


  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#eventListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderSort() {
    const prevSortComponent = this.#sortComponent;

    const sortTypes = Object.values(SortTypes)
      .map((type) => ({
        type,
        isChecked: (type === this.#currentSortType),
        isDisabled: !enabledSortType[type]
      }));

    this.#sortComponent = new SortView({
      items: sortTypes,
      onItemChange: this.#sortTypeChangeHandler
    });
    if (prevSortComponent) {
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    }
  }

  #sortTypeChangeHandler = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderSort();
    this.#renderPoints();

  };

  #sortPoints = (sortType) => {
    this.#currentSortType = sortType;
    this.#points = sortBy[this.#currentSortType](this.#points);
  };

  #renderPointsContainer() {
    render(this.#eventListComponent, this.#boardContainer);
  }

  #renderPoints() {
    this.#points = sortBy[this.#defaultSortType](this.#points);
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
