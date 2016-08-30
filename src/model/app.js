import Kefir from 'kefir';
import actions from '../actions/index';
import { emitState, updateState, pool } from '../utils/index';
import { appProvider, stateProvider } from './providers/index';

const State = new stateProvider({
    launched: false,
    prompt: ''
});

State.subscribe(function(state) {
  let state$ = emitState(state);
  model.plug(state$);
});

const model = Kefir.pool(),
      App = appProvider.getInstance(State);

// Start the App (initial step)
State.notify();

pool.onValue(x => {
    switch (x.type) {
        case actions.LAUNCH_CREATOR:
            App.launchCreator();
            break;
        case actions.GET_PROMPT:
            App.getPromptvalue(x.payload);
            break;
    }
});

export default model;