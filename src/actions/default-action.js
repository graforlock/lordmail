
import Kefir from 'kefir';
import actions from './index';
import pool from './pool';
import { registerIntent } from '../utils/index';

export default  {
  defaultAction: function(event) {
    pool.plug(
      registerIntent(
        actions.DEFAULT_ACTION, 
        Kefir.stream(emitter => emitter.emit(event)))
    );
  }
} 