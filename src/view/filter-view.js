import RadioListView from './radio-list-view';

function createFilterItemTemplate({ type, isChecked, isDisabled }) {
  return /*html*/ `
    <div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" data-item="${type}"
      ${isChecked ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`;
}

function createFilterTemplate(filters) {
  return /*html*/ `
    <form class="trip-filters" action="#" method="get">
      ${filters.map(createFilterItemTemplate).join(' ')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
}

export default class FilterView extends RadioListView {

  get template() {
    return createFilterTemplate(this._items);
  }
}
