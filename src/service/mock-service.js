import { generateDestination } from '../mocks/destination';
import { generateOffer } from '../mocks/offer';
import { generatePoint } from '../mocks/point';

import { getRandomArrayElement, getRandomInRange } from '../utils';
import { TYPES, POINT_COUNT, OFFER_COUNT } from '../mocks/const';

const DESTINATION_COUNT = 1;

export default class MockService {
  destinations = [];
  offers = [];
  points = [];

  constructor() {
    this.destinations = this.generateDestinations();
    this.offers = this.generateOffers();
    this.points = this.generatePoints();
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getPoints() {
    return this.points;
  }

  generateDestinations() {
    return Array.from({length: DESTINATION_COUNT}, () => generateDestination()
    );
  }

  generateOffers() {
    return TYPES.map((type) => ({
      type,
      offers: Array.from({length: getRandomInRange(0, OFFER_COUNT)}, () => generateOffer(type))
    }));
  }

  generatePoints() {
    return Array.from({length: POINT_COUNT}, () => {
      const type = getRandomArrayElement(TYPES);
      const destination = getRandomArrayElement(this.destinations);

      const hasOffers = getRandomInRange(0, 1);

      const offersByType = this.offers
        .find((offerByType) => offerByType.type === type);

      const offerIds = (hasOffers)
        ? offersByType.offers
          .slice(0, getRandomInRange(0, OFFER_COUNT))
          .map((offer) => offer.id)
        : [];

      return generatePoint(type, destination.id, offerIds);
    });
  }
}
