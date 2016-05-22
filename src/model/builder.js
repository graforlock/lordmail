import Kefir from 'kefir';
import { pool }  from '../utils/index';
import actions from '../actions/index';
import makeRow from '../layout/row';
import types from '../layout/types/index';
import { template, buildTemplate } from '../utils/template';
import { emitState } from '../utils/index';

const model = Kefir.pool();

let _state = {
    rows: []
};

let state$ = emitState(_state);

model.plug(state$);

const renderTemplate = (rows) => {
  
  let contentSection = template(rows.map(row => {
      return makeRow(row.type);
  }).join(''), types);
  buildTemplate(contentSection);
  
  _state.rows = rows;
  state$ = emitState(_state);
  model.plug(state$);
}

pool.onValue(x => {
  switch(x.type) {
    case actions.RENDER_TEMPLATE:
      renderTemplate(x.payload);
      break;
  }
});

export default model;