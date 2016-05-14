import actions from '../actions';

export const mirror = (obj) => {
    let o = {};
    Object.keys(obj).forEach(key => {
        o[key] = key;
    });
    return o;
}
