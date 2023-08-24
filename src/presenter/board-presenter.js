import EventsListView from '../view/events-list-view';
import SortView from '../view/sort-view';
import EventEditView from '../view/event-edit-view';
import PointView from '../view/point-view';
import { render } from '../render';

export default class BoardPresenter {
  eventListComponent = new EventsListView();

  constructor({boardContainer, destinationsModel, offersModel, pointsModel}) {
    this.boardContainer = boardContainer;
    this.destination = destinationsModel;
    this.offers = offersModel;
    this.points = pointsModel;

    this.points = [...pointsModel.get()];
  }

  init() {
    render(new SortView(), this.boardContainer);
    render(this.eventListComponent, this.boardContainer);

    render(new EventEditView({
      point: this.points[0],
      pointDestination: this.destination.getById(this.points[0].destination),
      pointOffers: this.offers.getByType(this.points[0].type)
    }), this.eventListComponent.getElement());

    this.points.forEach((point) => {
      render(
        new PointView({
          point,
          pointDestination: this.destination.getById(point.destination),
          pointOffers: this.offers.getByType(point.type)
        }), this.eventListComponent.getElement()
      );
    });
  }
}
