import { SortTypes } from '../mocks/const';
import { sortPointsByDate, sortPointsByTime, sortPointsByPrice } from './point';

const sortBy = {
  [SortTypes.DAY]: (points) => points.toSorted(sortPointsByDate),
  [SortTypes.PRICE]: (points) => points.toSorted(sortPointsByPrice),
  [SortTypes.TIME]: (points) => points.toSorted(sortPointsByTime),
};

export { sortBy };
