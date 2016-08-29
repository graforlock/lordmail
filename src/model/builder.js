import Kefir from 'kefir';
import { emitState, updateState, pool }  from '../utils/index';
import { buildTemplate } from '../utils/template';
import actions from '../actions/index';
import parseContents from '../utils/parse-contents';
import io from 'socket.io-client';
import { LOCALHOST } from '../../constants/index';
import { builderProvider } from './providers/index.js';

const socket = io.connect(LOCALHOST);

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
      Builder = builderProvider.getInstance({_state, model});


let state$ = emitState(_state);
model.plug(state$);


// SERVICES HERE:
Builder.onTemplateList();
Builder.onChangedTemplate();
// END OF SERVICES

pool.onValue(x => {
  switch(x.type) {
    case actions.RENDER_TEMPLATE:
      Builder.renderTemplate(x.payload);
      break;
    case actions.SEND_EMAIL:
      Builder.renderTemplate(x.payload);
      break;
  }
});

export default model;
