import Kefir from 'kefir';
import { pool }  from '../utils/index';
import actions from '../actions/index';
import makeRow from '../layout/row';
import menu from '../layout/partials/menu';
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

  let tableRows = rows.map((row,index) => {
        return makeRow(row.type,index);
    }).join('');
    
    // having {{menu/header}} now we can run it through template once 
    // after concat with { menu: 'htmlcontent' }  leaving transacion type(s) in
    // {{type}} thus separating these from menu.js
    
   let render = {
     tableInnerContent: template(menu(mode).concat(tableRows), types)
   }
  
  buildTemplate(render.tableInnerContent, recipent);
  
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