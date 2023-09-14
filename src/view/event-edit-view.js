import { formatToFullDate } from '../util/point';
import AbstractView from '../framework/view/abstract-view';
import { TYPES } from '../mocks/const';

function createEventEditTemplate({ point, pointDestination, pointOffers }) {
  const { type, dateFrom, dateTo, basePrice } = point;
  const { name, pictures, description } = pointDestination;

  const isOffers = pointOffers.length > 0;
  const isDestination = pictures.length > 0 && description;

  return /*html*/ `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${TYPES.map((eventType) => `
                <div class="event__type-item">
                    <input id="event-type-${eventType.toLowerCase()}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${eventType.toLowerCase()}" ${type.toLowerCase() === eventType.toLowerCase() ? 'checked' : ''}>
                    <label class="event__type-label event__type-label--${eventType.toLowerCase()}" for="event-type-${eventType.toLowerCase()}-1">${eventType}</label>
                </div>
                `).join('')}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatToFullDate(
    dateFrom
  )}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatToFullDate(
    dateTo
  )}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">${basePrice}</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
        </header>
        <section class="event__details">
        ${isOffers ? `
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${pointOffers.map((offer) => {
    const checked = point.offers.includes(offer.id) ? 'checked' : '';
    return /*html*/ `
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train"
              ${checked}>
              <label class="event__offer-label" for="event-offer-train-1">
                <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>`;
  })
    .join(' ')}
            </div>
          </section>` : ''}
          ${isDestination ? `
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${name} ${description}</p>
            <div class="event__photos-container">
            <div class="event__photos-tape">
              ${pictures
    .map(
      (picture) => /*html*/ `
                <img class="event__photo" src="${picture.src}" alt="${picture.description}">`
    )
    .join('')}
              </div>
            </div>
          </section>` : ' '}
          
        </section>
      </form>
    </li>
  `;
}

export default class EventEditView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #handleFormSubmit = null;
  #handleHideBtnClick = null;

  constructor({ point, pointDestination, pointOffers, onFormSubmit, onHideBtnClick }) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleHideBtnClick = onHideBtnClick;

    this.element.querySelector('.event')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#hideBtnClickHandler);
  }

  get template() {
    return createEventEditTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffers: this.#pointOffers,
    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };

  #hideBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleHideBtnClick();
  };
}
