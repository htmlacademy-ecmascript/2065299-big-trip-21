import { SORT_TYPE } from '../mocks/const';
import { sortPointsByDate, sortPointsByTime, sortPointsByPrice } from './point';

const sort = {
  [SORT_TYPE.DAY]: (points) => points.toSorted(sortPointsByDate),
  [SORT_TYPE.PRICE]: (points) => points.toSorted(sortPointsByPrice),
  [SORT_TYPE.TIME]: (points) => points.toSorted(sortPointsByTime),
};

export {sort};
