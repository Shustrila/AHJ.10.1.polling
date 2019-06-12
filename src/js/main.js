import Polling from './Polling';

const nodeRoot = document.querySelector('[data-widget="polling"]');
const polling = new Polling(nodeRoot);

polling.init();
