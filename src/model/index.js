import Intents from '../actions/default-action';
import Kefir from 'kefir';
import pool from '../actions/pool';
import actions from '../actions/index';

const model = Kefir.pool();

let _state = {
    counter: 0
};

let state$ = Kefir.stream(emitter => emitter.emit(_state));

model.plug(state$);

const defaultAction = () => {
   state$ = Kefir.stream(emitter => emitter.emit({
     counter: ++_state.counter
   }));
   model.plug(state$);
}

pool.onValue(x => {
  switch(x) {
    case actions.DEFAULT_ACTION:
      defaultAction();
      break;
  }
});

export default model;