import Kefir from 'kefir';
import { emitState, pool } from '../utils/index';
import actions from '../actions/index';
import { builderProvider, stateProvider } from './providers/index.js';

const State = new stateProvider({
    rows: [],
    mode: {
      trans: false,
      menu: false,
      weekly: false
    },
    templates: []
});

let _state = {
    rows: [],
    mode: {
      trans: false,
      menu: false,
      weekly: false
    },
    templates: []
};

const model = Kefir.pool(),
  Builder = builderProvider.getInstance({ _state, model });


let state$ = emitState(_state);
model.plug(state$);


Builder.onTemplateList();
Builder.onChangedTemplate();


pool.onValue(x => {
  switch (x.type) {
    case actions.RENDER_TEMPLATE:
      Builder.renderTemplate(x.payload);
      break;
    case actions.SEND_EMAIL:
      Builder.renderTemplate(x.payload);
      break;
  }
});

export default model;