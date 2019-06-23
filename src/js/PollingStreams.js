import { timer, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, concatMap } from 'rxjs/operators';

class PollingStreams {
    constructor() {
        this.timer$ = timer(0, 1000)
    }

    _getPosts(url, item) {
        return ajax.getJSON(url).pipe(
            map(data => {
                if(data.status === 'ok') {
                    return data.messages[item];
                } else {
                    return [];
                }
            }),
            catchError(() => of([]))
        )
    }

    createTimer(url) {
        return this.timer$.pipe(
            concatMap(item => this._getPosts(url, item)),

        )
    }
}

export default PollingStreams;
