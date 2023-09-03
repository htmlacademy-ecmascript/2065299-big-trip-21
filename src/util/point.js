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

function generateDateTo(date) {
  return dayjs(date).add(getRandomInRange(0, 60), 'minute').add(getRandomInRange(0, 23), 'hour').toDate();
}

function generateDateFrom(date) {
  return dayjs(date).subtract(getRandomInRange(0, 60), 'minute').subtract(getRandomInRange(0, 24), 'hour').subtract(getRandomInRange(0, 1), 'day').toDate();
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

export { generateDateTo, generateDateFrom, formatToDate, formatToFullDate, formatToTime, getPointDuration };
