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
  'Launches the app.',
  RENDER_TEMPLATE: 
  'Renders the template according to the current builder schema model.',
  SEND_EMAIL:
  'Sends a test email to preview.'
 /* ----------------- */
});