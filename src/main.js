import { RenderPosition, render } from './render';
import TripInfoView from './view/trip-info-view';
import FilterView from './view/filter-view';
import BoardPresenter from './presenter/board-presenter';
import { getPoint } from './mocks/point';
// import { getRandomInRange } from './utils';
// import { generateOffer} from './mocks/point';
// import { TYPES } from './mocks/const';

console.log(getPoint());
const tripInfoElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement
});

render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterElement);

boardPresenter.init();
