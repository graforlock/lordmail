import Kefir from 'kefir';
import actions from '../actions/index';
import { emitState, updateState, pool } from '../utils/index';
import { appProvider } from './providers/index';

let _state = {
    launched: false,
    prompt: ''
};

const model = Kefir.pool(),
    App = appProvider.getInstance({ _state, model });

let state$ = emitState(_state);
model.plug(state$);


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