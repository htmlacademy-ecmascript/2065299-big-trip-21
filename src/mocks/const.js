const POINT_COUNT = 8;
const OFFER_COUNT = 6;
const DESTINATION_COUNT = 3;
const PICTURE_COUNT = 8;

const CITIES = [
  'Chamonix',
  'Amsterdam',
  'Geneva',
  'Moscow',
  'Berlin',
  'London',
  'Tokio',
  'Madrid',
  'Barcelona',
];

const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
];

const OFFERS = [
  'Add luggage',
  'Switch to comfort',
  'Add meal',
  'Choose seats',
  'Travel by train',
];

const PRICE = {
  MIN: 1,
  MAX: 1000,
};

const TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const DATE_FORMAT = 'DD/MMM';
const TIME_FORMAT = 'HH:mm';
const FULL_DATE_FORMAT = 'DD/MM/YY HH:mm';

const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SORT_TYPE = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const enabledSortType = {
  [SORT_TYPE.DAY]: true,
  [SORT_TYPE.EVENT]: false,
  [SORT_TYPE.TIME]: true,
  [SORT_TYPE.PRICE]: true,
  [SORT_TYPE.OFFERS]: false,
};

export {
  POINT_COUNT,
  CITIES,
  DESCRIPTION,
  PRICE,
  TYPES,
  OFFER_COUNT,
  DATE_FORMAT,
  TIME_FORMAT,
  FULL_DATE_FORMAT,
  PICTURE_COUNT,
  OFFERS,
  DESTINATION_COUNT,
  FILTER_TYPE,
  SORT_TYPE,
  enabledSortType
};
