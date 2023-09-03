import { getRandomArrayElement, getRandomInRange } from '../util/common';
import { PRICE, OFFERS } from './const';

function generateOffer() {

  return {
    id: crypto.randomUUID(),
    title: getRandomArrayElement(OFFERS),
    price: getRandomInRange(PRICE.MIN, (PRICE.MAX / 10)),
  };
}

export {generateOffer};
