import Kefir from 'kefir';
import { pool, update }  from '../utils/index';
import actions from '../actions/index';
import { emitState } from '../utils/index';

const App = {};
const model = Kefir.pool();

let _state = {
    launched: false,
    prompt: ''
};

const updateState = update(_state);

let state$ = emitState(_state);
model.plug(state$);

App.launchCreator = () => {
   updateState({ launched: !_state.launched });
   state$ = emitState(_state);
   model.plug(state$);
}

App.getPromptvalue = (prompt) => {
  updateState({prompt});
  state$ = emitState(_state);
  model.plug(state$);
}

pool.onValue(x => {
  switch(x.type) {
    case actions.LAUNCH_CREATOR:
      App.launchCreator();
      break;
    case actions.GET_PROMPT:
      App.getPromptvalue(x.payload);
      break;
  }
});

export default model;