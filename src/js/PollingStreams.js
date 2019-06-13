import { timer, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { switchMap, map, catchError } from 'rxjs/operators';

class PollingStreams {
    constructor() {
        this.timer$ = {}
    }

    createTimer(url) {
        this.timer$ =  timer(0, 1000);

        return this.timer$.pipe(
            switchMap(() => ajax.getJSON(url)),
            map(data => {
                if(data.status === 'ok') {
                    return data.messages;
                }
            }),
            catchError(err => of(err))
        )
    }
}

export default PollingStreams;
