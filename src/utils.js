import dayjs from 'dayjs';
import { DATE_FORMAT, TIME_FORMAT, FULL_DATE_FORMAT } from './mocks/const';

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getCurrentDate() {
  return dayjs().toDate();
}

function generateDate(date) {
  return dayjs(date).add(getRandomInRange(0, 60), 'minute').add(getRandomInRange(0, 24), 'hour').add(getRandomInRange(0, 28), 'day').toDate();
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

export { getRandomArrayElement, getRandomInRange, generateDate, getCurrentDate, formatToDate, formatToFullDate, formatToTime };
