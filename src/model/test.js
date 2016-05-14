import Intents from '../actions/default-action';
import Kefir from 'kefir';
import pool from '../actions/pool';
import actions from '../actions';

const model = Kefir.pool();

let _state = {
    name: 'Aaron Chase'
};

let state$ = Kefir.stream(emitter => emitter.emit(_state));

model.plug(state$);

const testAction = () => {
   state$ = Kefir.stream(emitter => emitter.emit({
     name: 'Aaron Chase'
   }));
   model.plug(state$);
}

pool.onValue(x => {
  switch(x) {
    case actions.TEST_ACTION:
      testAction();
      break;
  }
});

export default model;