import Kefir from 'kefir';
import actions from './index';
import pool from './pool';

export default  {
  defaultAction: function(event) {
    pool.plug(
      Kefir.stream(emitter => emitter.emit(actions.DEFAULT_ACTION))
        .merge(Kefir.stream(emitter => emitter.emit(event)))
    );
  }
} 