import Intents from '../actions/default-action';
import Kefir from 'kefir';
import pool from '../actions/pool';
import actions from '../actions/index';
import {emitState} from '../utils/index';

const model = Kefir.pool();

let _state = {
    name: 'Aaron Chase'
};

let state$ = emitState(_state);

model.plug(state$);

const testAction = () => {
   _state.name = _state.name.concat(_state.name);
   state$ = emitState({
     name: _state.name
   });
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