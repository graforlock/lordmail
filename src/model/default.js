import Intents from '../actions/default-action';
import Kefir from 'kefir';
import pool from '../actions/pool';
import actions from '../actions/index';

import {emitState} from '../utils/index';

const model = Kefir.pool();

let _state = {
    counter: 0
};

let state$ = emitState(_state);

model.plug(state$);

const defaultAction = () => {
   state$ = emitState({
     counter: ++_state.counter
   });
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