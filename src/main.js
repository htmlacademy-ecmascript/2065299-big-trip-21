import { RenderPosition, render } from './render';
import TripInfoView from './view/trip-info-view';
import FilterView from './view/filter-view';
import BoardPresenter from './presenter/board-presenter';
import MockService from './service/mock-service';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import PointsModel from './model/points-model';

const tripInfoElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');


const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  destinationsModel,
  offersModel,
  pointsModel
});

render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterElement);

boardPresenter.init();
