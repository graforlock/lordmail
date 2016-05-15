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

export const registerIntent = (intentType, payload) => {

    return Kefir.combine(
            [
                Kefir.stream(emitter => emitter.emit(intentType)),
                payload
            ],
            (type, payload) => {
                console.log("here");
                return {type, payload}
            }
    );
}

export const ajax$ = (options) => {
    return Kefir.stream(function(emitter) {
        const jqXHR = axios(options);
        jqXHR.then(emitter.emit);
        jqXHR.catch(function (response) {
            if (response instanceof Error) {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', response.message);
            } else {
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            console.log(response.data);
            console.log(response.status);
            console.log(response.headers);
            console.log(response.config);
            }
        });
    }).take(1).takeErrors(1).toProperty();
}

