import { FilterTypes } from '../mocks/const';
import { isPointPast, isPointFuture, isPointPresent } from './point';

const filterBy = {
  [FilterTypes.EVERYTHING]: (points) => [...points],
  [FilterTypes.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FilterTypes.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FilterTypes.PAST]: (points) => points.filter((point) => isPointPast(point)),
};

export { filterBy };
