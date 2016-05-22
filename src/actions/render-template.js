
import Kefir from 'kefir';
import actions from './index';
import { registerIntent, payload  } from '../utils/index';

export default  {
  renderTemplate: function(event) {
      registerIntent(
        actions.RENDER_TEMPLATE, 
        payload(event))
  }
} 