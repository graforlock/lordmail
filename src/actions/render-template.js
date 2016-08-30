
import Kefir from 'kefir';
import actions from './index';
import { registerIntent, payload  } from '../utils/index';

export default  {
  updateSchema: function(event) {
      registerIntent(
        actions.UPDATE_SCHEMA, 
        payload(event))
    
  },
  renderTemplate: function(event) {
      registerIntent(
        actions.RENDER_TEMPLATE, 
        payload(event))
  }
} 