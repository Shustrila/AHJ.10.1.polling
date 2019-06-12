import moment from 'moment';

import PollingView from './PollingView';
import PollingStreams from './PollingStreams';

class Polling {
    constructor(nodeRoot) {
        this.view = new PollingView(nodeRoot);
        this.streams = new PollingStreams();
    }

    init() {
        const { streams } = this;
        const url = 'https://shj-polling.herokuapp.com/messages/unread';

        this._subscribeTimer(streams.createTimer(url));
    }

    _subscribeTimer(timer$) {
        timer$.subscribe({
            next: data => this.view.createItem(data[0]),
            error: err => console.log(err),
        })
    }
}

export default Polling;
