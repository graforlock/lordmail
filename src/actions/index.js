import {mirror} from '../utils/index';

//-> Action index and documentation :

export default mirror({
  LAUNCH_CREATOR: 
  'Launches the app.',
  RENDER_TEMPLATE: 
  'Renders the template according to the current builder schema model.',
  BACK_TO_MAIN: 
  'Resets all the state and goes back to main app menu prompt.',
  UPDATE_SCHEMA: 
  'Updates rows and mode.',
  SEND_EMAIL:
  'Sends a test email to preview.',
  GET_PROMPT:
  'Gets user prompt and names template.'
});
