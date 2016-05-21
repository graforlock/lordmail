
import Kefir from 'kefir';
import actions from './index';
import { registerIntent, payload  } from '../utils/index';

export default  {
  defaultAction: function(event) {
      registerIntent(
        actions.DEFAULT_ACTION, 
        payload(event))
  }
} 