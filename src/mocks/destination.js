import { getRandomArrayElement } from '../utils';
import { getRandomInRange } from '../utils';
import { CITIES, DESCRIPTION, PICTURE_COUNT } from './const';

function generateDestination() {
  const city = getRandomArrayElement(CITIES);
  const description = DESCRIPTION.slice(0, getRandomInRange(1, DESCRIPTION.length)).join(' ');

  const generatePicture = function () {
    return {
      src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
      description: `${city} ${description}`,
    };
  };

  return {
    id: crypto.randomUUID(),
    description,
    name: city,
    pictures: Array.from({length: getRandomInRange(1, PICTURE_COUNT)}, generatePicture),
  };
}

export { generateDestination };
