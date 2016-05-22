import Kefir from 'kefir';
import { pool }  from '../utils/index';
import actions from '../actions/index';

import { emitState } from '../utils/index';

const model = Kefir.pool();

let _state = {
    rows: []
};

let state$ = emitState(_state);

model.plug(state$);

const renderTemplate = () => {
  console.log(_state);
}

pool.onValue(x => {
  switch(x.type) {
    case actions.RENDER_TEMPLATE:
      renderTemplate();
      break;
  }
});

export default model;