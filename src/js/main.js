import Polling from './Polling';

const polling = new Polling();

polling.init('[data-widget="polling"]').then(data => {
    polling.create(data);
});
