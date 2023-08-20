import dayjs from 'dayjs';

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getDateToHumanize() {
  return dayjs().format('DD/MM/YY HH:mm');
}

function generateDate() {
  return dayjs().add(getRandomInRange(0, 60), 'minute').add(getRandomInRange(0, 24), 'hour').add(getRandomInRange(0, 28), 'day').format('DD/MM/YY HH:mm');
}

export { getRandomArrayElement, getRandomInRange, generateDate, getDateToHumanize };
