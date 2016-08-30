import Kefir from 'kefir';
import { emitState, pool } from '../utils/index';
import actions from '../actions/index';
import { builderProvider, stateProvider, appProvider } from './providers/index.js';

const State = new stateProvider({
    rows: [],
    mode: {
      trans: false,
      menu: false,
      weekly: false
    },
    templates: [],
    launched: false,
    prompt: ''
});

State.subscribe(function(state) {
  let state$ = emitState(state);
  model.plug(state$);
})

const model = Kefir.pool(),
      Builder = builderProvider.getInstance(State),
      App = appProvider.getInstance(State);

//-> Web sockets listeners :
Builder.onTemplateList();
Builder.onChangedTemplate();

pool.onValue(x => {
  switch (x.type) {
    case actions.LAUNCH_CREATOR:
        App.launchCreator();
        break;
    case actions.GET_PROMPT:
        App.getPromptvalue(x.payload);
        break;
    case actions.RENDER_TEMPLATE:
        Builder.renderTemplate(x.payload);
        break;
    case actions.SEND_EMAIL:
        Builder.renderTemplate(x.payload);
        break;
    case actions.UPDATE_SCHEMA:
        Builder.updateSchema(x.payload);
        break;
  }
});

export default model;