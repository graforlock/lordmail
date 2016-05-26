import Kefir from 'kefir';
import { pool }  from '../utils/index';
import actions from '../actions/index';
import partials from '../layout/partials/index';
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

const renderTemplate = ({rows, mode, recipent = false}) => {
  let precompiled = {
    tableRows: rows.map((row,index) => {
          return partials.row(row.type,index);
      }).join(''),
    menuRow: partials.menu(mode)
  }
   
   let compiled = {
     tableInnerContent: template(precompiled.menuRow.concat(precompiled.tableRows), types)
   }
  
  buildTemplate(compiled.tableInnerContent, recipent);
  
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