import Kefir from 'kefir';
import actions from './index';
import pool from './pool';

export default  {
  testAction: function(event) {
    pool.plug(
      Kefir.stream(emitter => emitter.emit(actions.TEST_ACTION))
        .merge(Kefir.stream(emitter => emitter.emit(event)))
    );
  }
} 