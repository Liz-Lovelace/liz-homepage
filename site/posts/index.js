// Essays that live on this site (most live on Substack, see data.js).
// Each one is a component, so an essay can have whatever layout it needs.

import Factorio from './Factorio.jsx';
import RobustTrust from './RobustTrust.jsx';

export const posts = {
  factorio: {
    title: 'Factorio: e/acc update',
    description: 'What if you don’t get into the rocket?',
    date: '2024-10-13',
    image: '/blog/factorio.jpg',
    Body: Factorio,
  },
  'robust-trust': {
    title: 'Robust Trust',
    description: 'Relying on others without being vulnerable to betrayal.',
    date: '2023-07-03',
    Body: RobustTrust,
  },
};
