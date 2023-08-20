import dayjs from 'dayjs';

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatDate(date) {
  dayjs(date).format('MMM DD');
}

function formatTime(date) {
  dayjs(date).format('HH:mm');
}

function getDate({next}, date = dayjs()) {

  if (next) {
    date = dayjs(date).add(getRandomInRange(0, 60, 'minute')).add(getRandomInRange(0, 24, 'hour')).add(getRandomInRange(0, 28, 'day'));

    return date;
  }
}

export { getRandomArrayElement, getRandomInRange, formatDate, formatTime, getDate };
