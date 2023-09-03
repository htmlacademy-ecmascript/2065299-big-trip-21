import { getRandomInRange } from '../util/common';
import { generateDateTo, generateDateFrom } from '../util/point';
import { PRICE } from './const';

function generatePoint(type, destinationId, offerIds) {

  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInRange(PRICE.MIN, PRICE.MAX),
    dateFrom: generateDateFrom(),
    dateTo: generateDateTo(),
    destination: destinationId,
    isFavorite: getRandomInRange(0, 1),
    type,
    offers: offerIds,
  };
}

export { generatePoint };
