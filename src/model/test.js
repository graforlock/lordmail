import Intents from '../actions/default-action';
import Kefir from 'kefir';
import pool from '../actions/pool';
import actions from '../actions/index';
import {emit} from '../utils/index';

const model = Kefir.pool();

let _state = {
    name: 'Aaron Chase',
    data: null
};

let state$ = emit(_state);

model.plug(state$);

const testAction = () => {
   _state.name = _state.name.concat(_state.name);
   state$ = emit(_state);
   model.plug(state$);
}


const promiseAction = (x) => {
   _state.data = x;
   state$ = emit(_state);
   model.plug(state$);
}

pool.onValue(x => {
  switch(x.type) {
    case actions.TEST_ACTION:
      testAction();
      break;
    case actions.PROMISE_ACTION:
      promiseAction(x.payload);
      break;
  }
});

export default model;