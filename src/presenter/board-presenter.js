import EventsListView from '../view/events-list-view';
import SortView from '../view/sort-view';
import EventEditView from '../view/event-edit-view';
import PointView from '../view/point-view';
import { render } from '../render';

export default class BoardPresenter {
  eventListComponent = new EventsListView();

  constructor({boardContainer, destinationsModel, offersModel, pointsModel}) {
    this.boardContainer = boardContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;
    this.points = [...this.pointsModel.get()];
  }

  init() {
    render(new SortView(), this.boardContainer);
    render(this.eventListComponent, this.boardContainer);
    render(new EventEditView(), this.eventListComponent.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(new PointView({point: this.points[i]}), this.eventListComponent.getElement());
    }
  }
}
