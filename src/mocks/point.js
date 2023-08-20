import { getRandomInRange, getDate } from '../utils';
import { Price } from './const';

function generatePoint(type, destinationId, offersByType) {

  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInRange(Price.MIN, Price.MAX),
    dateFrom: getDate({next: false}),
    dateTo: getDate({next: true}),
    destination: destinationId,
    isFavorite: getRandomInRange(0, 1),
    offers: offersByType,
    type,
  };
}

export { generatePoint };
