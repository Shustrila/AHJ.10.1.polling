import { ajax } from 'rxjs/ajax';
import moment from 'moment';

class Polling {
    constructor() {
        this._nodeRoot = '';
        this.showeMessage = 0;
    }

    init(nodeRoot) {
        return new Promise((resolve, regject) => {
            this.showeMessage = 2;
            this._nodeRoot = nodeRoot;

            const get$ = ajax.getJSON('https://shj-polling.herokuapp.com/messages/unread');

            get$.subscribe(data => {
                if (data.status === 'ok') {
                    setInterval(() => {
                        this._createItem(data.messages[this.showeMessage++]);
                    }, 2000);
                    resolve(data.messages);
                } else {
                    regject();
                }
            });
        })
    }

    static _croppedString(text, col) {
        let string = '';

        for(let i = 0; i < col; i++){
            if (string.length < col) {
                string += text[i];
            }
        }

        string.trim();

        return string + '...';
    }

    _createItem(obj) {
        const root = document.querySelector(this._nodeRoot);
        const list = root.querySelector('[data-polling="list"]');

        const name = document.createElement('p');
        name.className = 'polling__item-name';
        name.innerHTML = obj.from;

        const subject = document.createElement('p');
        subject.className = 'polling__item-subject';
        subject.innerHTML = Polling._croppedString(obj.subject, 15);

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

    create(data = []) {
        for(let i = 0; i < this.showeMessage; i++) {
            this._createItem(data[i]);
        }
    }
}

export default Polling;
