import Kefir from 'kefir';
import axios from 'axios';

/*
 Action Pool.
 -------------
 Stores the name of the current action, that is being fed to the model.
*/

export const pool = Kefir.pool();

export const plug = (intent) => {
    return pool.plug(intent);
};
export const range = (start,end) => {
    let _range = [];
    for(let i = start; i < end; i++) {
        _range.push(i);
    }
    return _range;
}

export const typeOf = (object) => {
    return {}.toString.call(object);
}

export const update = (state) => (property) => Object.assign(state, property);


export const compose = (...fns) => (v) => fns.reverse().reduce((a,b) => b(a), v);

export const partial = (fn)  => {
    let arity = fn.length;
    return getArgs([]);
    function getArgs(totalArgs) {
        return function stepTwo(...args) {
            var nextTotalArgs = totalArgs.concat(args);
            if (nextTotalArgs.length >= arity)
                return fn.apply(this, nextTotalArgs);
            else
                return getArgs(nextTotalArgs);
        }
    }
}

export const flip = partial((fn, ...args) => {
    return fn(...args.reverse());
})

export const map = partial((fn, array) => {
    return array.map(fn);
})

export const join = (array) => {
    return array.join('');
}

export const strconcat = (...strings) => {
    return strings.reduce((a,b) => a.concat(b), '');
}

export const between = (position, point, offset = 2.5) => position <= (point + offset)  && position >= (point - offset); 

export const mirror = (obj) => {
    let o = {};
    Object.keys(obj).forEach(key => {
        o[key] = key;
    });
    return o;
}

export const payload = (state) => {
    return Kefir.stream(emitter => emitter.emit(state));
};
export const emitState = payload;

export const registerIntent = (intentType, payload) => {
    
    return plug(Kefir.combine(
            [
                Kefir.stream(emitter => emitter.emit(intentType)),
                payload
            ],
            (type, payload) => {
                return {type, payload}
            }
    ));
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

export const updateState = (model, {state, newState}) => {
    let _state = {...state, ...newState},
        state$ = emitState(_state);
    model.plug(state$);
}