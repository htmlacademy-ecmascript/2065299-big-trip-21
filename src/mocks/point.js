import { getRandomInRange, generateDate, getRandomArrayElement, getDateToHumanize } from '../utils';
import { TYPES, Price, CITIES, DESCRIPTION, OFFER_COUNT } from './const';

function generateDestination() {
  const city = getRandomArrayElement(CITIES);

  return {
    id: crypto.randomUUID(),
    description: DESCRIPTION,
    name: city,
    pictures: [
      {
        'src': 'https://loremflickr.com/248/152?random=crypto.randomUUID()',
        'description': `${city} description`,
      }
    ]
  };
}

function generateOffer(type) {
  return {
    id: crypto.randomUUID(),
    title: `Offer ${type}`,
    price: getRandomInRange(Price.MIN, (Price.MAX / 10)),
  };
}


function getPoint() {
  const type = getRandomArrayElement(TYPES);

  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInRange(Price.MIN, Price.MAX),
    dateFrom: getDateToHumanize(),
    dateTo: generateDate(),
    destination: generateDestination(),
    isFavorite: getRandomInRange(0, 1),
    type: type,
    offers: Array.from({length: getRandomInRange(1, OFFER_COUNT)}, generateOffer),
  };
}


export { getPoint };
