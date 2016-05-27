import Kefir from 'kefir';
import { pool, compose, join, strconcat, map }  from '../utils/index';
import actions from '../actions/index';
import { emitState } from '../utils/index';

import partials from '../layout/partials/index';
import contentTypes from '../layout/types/index';
import { template, buildTemplate } from '../utils/template';

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
  // Build and send the template to render
  let {row, menu, social} = partials;
  const createRows = compose(join, map(row));
  let precompiled = strconcat(
      menu(mode),
      createRows(rows)
    );
  let compiled = template(precompiled, contentTypes);
  buildTemplate(compiled, recipent);
  
  // Update the state:
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