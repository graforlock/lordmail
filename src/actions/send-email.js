
import Kefir from 'kefir';
import actions from './index';
import { registerIntent, payload  } from '../utils/index';

export default  {
  sendEmail: function(event) {
      registerIntent(
        actions.SEND_EMAIL, 
        payload(event))
  }
} 