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

const EditType = {
  EDITING: 'EDITING',
  CREATING: 'CREATING',
};

const DEFAULT_TYPE = 'flight';

const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE,
};


const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const FULL_DATE_FORMAT = 'DD/MM/YY HH:mm';

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const enabledSortType = {
  [SortTypes.DAY]: true,
  [SortTypes.EVENT]: false,
  [SortTypes.TIME]: true,
  [SortTypes.PRICE]: true,
  [SortTypes.OFFERS]: false,
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  DELETE_POINT: 'DELETE_POINT',
  CREATE_POINT: 'CREATE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR',
};

const NoPointText = {
  EVERYTHING : 'Click New Event to create your first point',
  FUTURE : 'There are no future events now',
  PRESENT : 'There are no present events now',
  PAST : 'There are no past events now',
};


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};


const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {
  TYPES,
  DATE_FORMAT,
  TIME_FORMAT,
  FULL_DATE_FORMAT,
  FilterTypes,
  SortTypes,
  enabledSortType,
  UpdateType,
  UserAction,
  NoPointText,
  EditType,
  POINT_EMPTY,
  Mode,
  Method,
  TimeLimit
};
