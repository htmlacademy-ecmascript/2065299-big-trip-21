import { getRandomArrayElement } from '../utils';
import { getRandomInRange } from '../utils';
import { CITIES, DESCRIPTION } from './const';

function generateDestination() {
  const city = getRandomArrayElement(CITIES);

  return {
    id: crypto.randomUUID(),
    description: DESCRIPTION.slice(0, getRandomInRange(1, DESCRIPTION.length)).join(' '),
    name: city,
    pictures: [
      {
        'src': 'https://loremflickr.com/248/152?random=crypto.randomUUID()',
        'description': `${city} description`,
      }
    ]
  };
}

export { generateDestination };
