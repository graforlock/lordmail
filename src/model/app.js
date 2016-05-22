import Kefir from 'kefir';
import { pool }  from '../utils/index';
import actions from '../actions/index';

import {emitState } from '../utils/index';

const model = Kefir.pool();

let _state = {
    launched: false
};

let state$ = emitState(_state);

model.plug(state$);

const launchCreator = () => {
  _state.launched = !_state.launched;
   state$ = emitState({
     launched: _state.launched
   });
   model.plug(state$);
}

pool.onValue(x => {
  switch(x.type) {
    case actions.LAUNCH_CREATOR:
      launchCreator();
      break;
  }
});

export default model;