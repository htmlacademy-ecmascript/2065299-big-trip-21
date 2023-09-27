import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DATE_FORMAT, TIME_FORMAT, FULL_DATE_FORMAT } from '../mocks/const';
import { getRandomInRange } from './common';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;

const MSEC_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MSEC_IN_SEC;

const MSEC_IN_DAY = HOUR_IN_DAY * MSEC_IN_HOUR;

function getPointDuration(dateFrom, dateTo) {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));

  let pointDuration = 0;

  switch (true) {
    case timeDiff >= MSEC_IN_DAY:
      pointDuration = dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');
      break;
    case timeDiff >= MIN_IN_HOUR:
      pointDuration = dayjs.duration(timeDiff).format('HH[H] mm[M]');
      break;
    case timeDiff >= MSEC_IN_HOUR:
      pointDuration = dayjs.duration(timeDiff).format('mm[M]');
      break;
  }

  return pointDuration;
}

const startDay = dayjs()
  .subtract(getRandomInRange(0, 60), 'minute')
  .subtract(getRandomInRange(0, 24), 'hour')
  .subtract(getRandomInRange(0, 3), 'day');

function generateDateFrom() {
  return startDay.subtract(getRandomInRange(0, 24), 'hour').toDate();
}

function generateDateTo() {
  return startDay
    .add(getRandomInRange(0, 60), 'minute')
    .add(getRandomInRange(0, 23), 'hour')
    .add(getRandomInRange(0, 5), 'day')
    .toDate();
}

function formatToDate(date) {
  return dayjs(date).format(DATE_FORMAT);
}

function formatToTime(date) {
  return dayjs(date).format(TIME_FORMAT);
}

function formatToFullDate(date) {
  return dayjs(date).format(FULL_DATE_FORMAT);
}

function isPointFuture(point) {
  return dayjs().isBefore(point.dateFrom);
}

function isPointPast(point) {
  return dayjs().isAfter(point.dateTo);
}

function isPointPresent(point) {
  return dayjs().isBefore(point.dateTo) && dayjs().isAfter(point.dateFrom);
}

function sortPointsByDate(a, b) {
  return dayjs(a.dateFrom) > dayjs(b.dateFrom) ? 1 : -1;
}

function sortPointsByTime(a, b) {
  return dayjs(a.dateFrom).diff(dayjs(a.dateTo)) >
    dayjs(b.dateFrom).diff(dayjs(b.dateTo))
    ? 1
    : -1;
}

function sortPointsByPrice(a, b) {
  return a.basePrice > b.basePrice ? -1 : 1;
}

function isBigDifferance(pointA, pointB) {
  return (
    pointA.dateFrom !== pointB.dateFrom ||
    pointA.basePrice !== pointB.basePrice ||
    getPointDuration(pointA.dateFrom, pointA.dateTo) !==
    getPointDuration(pointB.dateFrom, pointB.dateTo)
  );
}

export {
  generateDateTo,
  generateDateFrom,
  formatToDate,
  formatToFullDate,
  formatToTime,
  getPointDuration,
  isPointFuture,
  isPointPast,
  isPointPresent,
  sortPointsByDate,
  sortPointsByPrice,
  sortPointsByTime,
  isBigDifferance
};
