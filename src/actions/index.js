const mirror = (obj) => {
    let o = {};
    Object.keys(obj).forEach(key => {
        o[key] = key;
    });
    return o;
}
/*
    Action Index.
    -------------
    Registers all the possible actions involved in the app state.
*/
export default mirror({
 /* ----------------- */
  LAUNCH_CREATOR: 
  'Description of the Default action here (...)'
 /* ----------------- */
});