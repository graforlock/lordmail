import actions from '../actions/index';
import Kefir from 'kefir';
import axios from 'axios';

export const mirror = (obj) => {
    let o = {};
    Object.keys(obj).forEach(key => {
        o[key] = key;
    });
    return o;
}

export const emit = (state) => {
    return Kefir.stream(emitter => emitter.emit(state));
};
export const emitState = emit;

export const registerIntent = (intentType, payload) => {

    return Kefir.combine(
            [
                Kefir.stream(emitter => emitter.emit(intentType)),
                payload
            ],
            (type, payload) => {
                return {type, payload}
            }
    );
}

export const ajax$ = (options) => {
    return Kefir.stream(function(emitter) {
        const XHR = axios(options);
        XHR.then(emitter.emit);
        XHR.catch(function (response) {
            if (response instanceof Error) {
                console.log('Error', response.message);
            } else {
                console.log(response.data);
                console.log(response.status);
                console.log(response.headers);
                console.log(response.config);
            }
        });
    }).take(1).takeErrors(1).toProperty();
}

