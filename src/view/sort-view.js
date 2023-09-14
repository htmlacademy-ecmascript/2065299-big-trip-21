import RadioListView from './radio-list-view';

function createSortItem({type, isChecked, isDisabled}) {
  return /*html*/ `
    <div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''} data-item="${type}">
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>
  `;
}

function createSortTemplate(sortTypes) {
  return /*html*/ `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
     ${sortTypes.map((sortItem) => createSortItem(sortItem)).join(' ')} 
    </form>
  `;
}

export default class SortView extends RadioListView{
  get template() {
    return createSortTemplate(this._items);
  }
}
