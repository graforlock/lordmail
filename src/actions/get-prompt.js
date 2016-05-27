
import Kefir from 'kefir';
import actions from './index';
import { registerIntent, payload  } from '../utils/index';

export default  {
  getPrompt: function(event) {
    registerIntent(
      actions.GET_PROMPT,
      payload(event)
    )
  }
} 