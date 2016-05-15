import actions from '../actions/index';
import Kefir from 'kefir';

export const mirror = (obj) => {
    let o = {};
    Object.keys(obj).forEach(key => {
        o[key] = key;
    });
    return o;
}

export const emitState = (state) => {
    return Kefir.stream(emitter => emitter.emit(state));
};