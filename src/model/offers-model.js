export default class OffersModel {
  constructor(service) {
    this.service = service;
    this.destinations = this.service.getOffers();
  }

  get() {
    return this.ofers;
  }
}
