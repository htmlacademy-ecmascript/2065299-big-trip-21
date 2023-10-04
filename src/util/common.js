function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

const toCapitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

export {updateItem, toCapitalize};
