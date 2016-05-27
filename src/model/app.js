import Kefir from 'kefir';
import { pool }  from '../utils/index';
import actions from '../actions/index';

import {emitState } from '../utils/index';

const model = Kefir.pool();

let _state = {
    launched: false,
    prompt: ''
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

const getPromptvalue = (promptValue) => {
  console.log(promptValue);
  _state.prompt = promptValue;
     state$ = emitState({
     prompt: _state.prompt
   });
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