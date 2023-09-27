import { RenderPosition, render } from './framework/render';
import TripInfoView from './view/trip-info-view';
import BoardPresenter from './presenter/board-presenter';
import MockService from './service/mock-service';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import PointsModel from './model/points-model';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';
import NewPointButtonPresenter from './presenter/new-point-button-presenter';

const tripInfoElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);
const filterModel = new FilterModel;

const newPointButtonPresenter = new NewPointButtonPresenter({container: tripInfoElement});

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
  newPointButtonPresenter
});

const filterPresenter = new FilterPresenter({
  container: filterElement,
  pointsModel
});

render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);

newPointButtonPresenter.init({onButtonClick: boardPresenter.newPointButtonClickHandler});
filterPresenter.init();
boardPresenter.init();
