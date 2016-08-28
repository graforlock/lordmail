import Kefir from 'kefir';
import actions from '../actions/index';
import { emitState, updateState } from '../utils/index';

const App = {};
const model = Kefir.pool();

let _state = {
    launched: false,
    prompt: ''
};

let state$ = emitState(_state);
model.plug(state$);

App.launchCreator = () => {
   updateState(model, {state: _state, newState: { launched: !_state.launched }});
}

App.getPromptvalue = (prompt) => {
  updateState(model, {state: _state, newState: {prompt}});

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