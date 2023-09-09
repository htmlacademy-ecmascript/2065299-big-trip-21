import EventsListView from '../view/events-list-view';
import SortView from '../view/sort-view';
import EventEditView from '../view/event-edit-view';
import PointView from '../view/point-view';
import NoPointView from '../view/no-point-view';
import { render, replace, RenderPosition } from '../framework/render';

export default class BoardPresenter {
  #eventListComponent = new EventsListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();
  #boardContainer = null;
  #destination = null;
  #offers = null;
  #points = [];

  constructor({boardContainer, destinationsModel, offersModel, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#destination = destinationsModel;
    this.#offers = offersModel;

    this.#points = [...pointsModel.get()];
  }

  #renderPoint (point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      pointDestination: this.#destination.getById(point.destination),
      pointOffers: this.#offers.getByType(point.type),
      onEditBtnClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new EventEditView({
      point,
      pointDestination: this.#destination.getById(point.destination),
      pointOffers: this.#offers.getByType(point.type),
      onFormSubmit: () => {
        replaceFormToPoint();
      },
      onHideBtnClick: () => {
        replaceFormToPoint();
      }
    });

    render(pointComponent, this.#eventListComponent.element);

    function replacePointToForm () {
      replace(editPointComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, editPointComponent);
    }
  }

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
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
    render(this.#eventListComponent, this.#boardContainer);

    if(this.#points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  }

  init() {
    this.#renderBoard();
  }
}
