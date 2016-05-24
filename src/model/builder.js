import Kefir from 'kefir';
import { pool }  from '../utils/index';
import actions from '../actions/index';
import makeRow from '../layout/row';
import types from '../layout/types/index';
import { template, buildTemplate } from '../utils/template';
import { emitState } from '../utils/index';

const model = Kefir.pool();

let _state = {
    rows: [],
    mode: {
        trans: false,
        menu: false,
        weekly: false
    }
};

let state$ = emitState(_state);

model.plug(state$);

const renderTemplate = ({rows, recipent = false}) => {
  let tableRows = rows.map(row => {
        return makeRow(row.type);
    }).join('');
  let tableInnerContent = template(tableRows, types);
  
  buildTemplate(tableInnerContent, recipent);
  
  _state.rows = rows;
  state$ = emitState(_state);
  model.plug(state$);
}

pool.onValue(x => {
  switch(x.type) {
    case actions.RENDER_TEMPLATE:
      renderTemplate(x.payload);
      break;
    case actions.SEND_EMAIL:
      renderTemplate(x.payload);
      break;
  }
});

export default model;