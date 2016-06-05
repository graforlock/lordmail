import Kefir from 'kefir';
import { pool, compose, join, strconcat as bundle, map }  from '../utils/index';
import actions from '../actions/index';
import { emitState } from '../utils/index';
import io from 'socket.io-client';
import partials from '../layout/partials/index';
import { LOCALHOST } from '../../constants/index';
import contentTypes from '../layout/types/index';
import { template, buildTemplate, emitData } from '../utils/template';

const model = Kefir.pool();
const socket = io.connect(LOCALHOST);

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

const _parseContents = ({rows,mode}) => {
  console.log(rows,mode);
  // Destructuring the partials  
  let {row, menu, social, button} = partials;
  
  // Build and send the template to render
  const createRows = compose(join, map(row)); //-->  Functional composition: Template each row (functor is partially applied)
  let precompiled = bundle(
      menu(mode),
      createRows(rows),
      social,
      button(mode)
    );
  let compiled = template(precompiled, contentTypes);
 
  return compiled;  

}

const renderTemplate = ({data, destination}) => {
 
 let compiled = _parseContents(data);

  socket.emit('build_template', buildTemplate(compiled), destination)

  // Update the state:
  _state = data;
  state$ = emitState(_state);
  model.plug(state$);
}

const sendTemplate = ({data, address}) => {

  let compiled = _parseContents(data);
 
  socket.emit('send_email', buildTemplate(compiled), address)

  // Update the state:
  _state = data;
  state$ = emitState(_state);
  model.plug(state$);
}

pool.onValue(x => {
  switch(x.type) {
    case actions.RENDER_TEMPLATE:
      console.log(x.payload);
      renderTemplate(x.payload);
      break;
    case actions.SEND_EMAIL:
      renderTemplate(x.payload);
      break;
  }
});

export default model;
