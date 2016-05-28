import Kefir from 'kefir';
import { pool, update }  from '../utils/index';
import actions from '../actions/index';

import {emitState } from '../utils/index';

const model = Kefir.pool();

let _state = {
    launched: false,
    prompt: ''
};

const updateState = update(_state);


let state$ = emitState(_state);
model.plug(state$);

const launchCreator = () => {
   updateState({ launched: !_state.launched });

   state$ = emitState(_state);
   model.plug(state$);
}

const getPromptvalue = (prompt) => {
  updateState({prompt});
  state$ = emitState(_state);
  model.plug(state$);
}

pool.onValue(x => {
  switch(x.type) {
    case actions.LAUNCH_CREATOR:
      launchCreator();
      break;
    case actions.GET_PROMPT:
      getPromptvalue(x.payload);
      break;
  }
});

export default model;