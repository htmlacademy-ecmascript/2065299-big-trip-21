import EventsListView from '../view/events-list-view';
import SortView from '../view/sort-view';
import NoPointView from '../view/no-point-view';
import PointPresenter from './point-presenter';
import { render, RenderPosition, replace, remove } from '../framework/render';
import { SortTypes, UpdateType, UserAction, enabledSortType } from '../mocks/const';
import { sortBy } from '../util/sort-by';
import { filterBy } from '../util/filter-by';

export default class BoardPresenter {
  #eventListComponent = new EventsListView();
  #sortComponent = null;
  #noPointComponent = null;
  #boardContainer = null;

  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #filterModel = null;

  #currentSortType = SortTypes.DAY;


  #pointPresenters = new Map();

  constructor({boardContainer, destinationsModel, offersModel, pointsModel, filterModel}) {
    this.#boardContainer = boardContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get points() {
    const filterType = this.#filterModel.get();
    const filteredPoints = filterBy[filterType](this.#pointsModel.get());

    return sortBy[this.#currentSortType](filteredPoints);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };


  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#eventListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
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

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#clearPoints();
    remove(this.#sortComponent);
    this.#sortComponent = null;

    if(resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.update(updateType, update);
        break;
      case UserAction.CREATE_POINT:
        this.#pointsModel.add(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.delete(updateType, update);
        break;
    }
  };

  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters?.get(data.id)?.init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #sortTypeChangeHandler = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderSort();
    this.#renderPoints();

  };

  #renderPointsContainer() {
    render(this.#eventListComponent, this.#boardContainer);
  }

  #renderPoints() {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#noPointComponent);
  }

  #renderNoPoint() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterModel.get()
    });
    render(this.#noPointComponent, this.#boardContainer);
  }

  #renderBoard() {
    if(this.points.length === 0) {
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
