import moment from "moment";

class PollingView {
    constructor(nodeRoot) {
        this._nodeRoot = nodeRoot;
    }

    createItem(obj) {
        const list = this._nodeRoot.querySelector('[data-polling="list"]');

        const name = document.createElement('p');
        name.className = 'polling__item-name';
        name.innerHTML = obj.from;

        const subject = document.createElement('p');
        subject.className = 'polling__item-subject';
        subject.innerHTML = obj.subject.substr(0, 15).trim() + '...';

        const received = document.createElement('p');
        received.className = 'polling__item-received';
        received.innerHTML =  moment(obj.received).format('hh:mm MM.DD.YYYY');

        const item = document.createElement('li');
        item.className = 'polling__item';
        item.prepend(received);
        item.prepend(subject);
        item.prepend(name);

        list.prepend(item);
    }
}

export default PollingView;
