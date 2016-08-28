import Kefir from 'kefir';
import { emitState, updateState, pool }  from '../utils/index';
import { buildTemplate } from '../utils/template';
import actions from '../actions/index';
import parseContents from '../utils/parse-contents';
import io from 'socket.io-client';
import { LOCALHOST } from '../../constants/index';

const socket = io.connect(LOCALHOST);

const Builder = {};
const model = Kefir.pool();

let _state = {
    rows: [],
    mode: {
        trans: false,
        menu: false,
        weekly: false
    },
    templates: []
};

let state$ = emitState(_state);
model.plug(state$);

Builder.renderTemplate = ({data, destination}) => {
 
 let compiled = parseContents(data);

  socket.emit('build_template', buildTemplate(compiled), 
                                destination, 
                                {rows: _state.rows, mode: _state.mode})

  // Update the state:
  updateState(model, {state: _state, newState: data});

}

Builder.sendTemplate = ({data, address}) => {

  let compiled = parseContents(data);
 
  socket.emit('send_email', buildTemplate(compiled), 
                            address)

  // Update the state:
  updateState(model, {state: _state, newState: data});

}

// SERVICES HERE:

socket.on('template_list', data => {

  updateState(model, {state: _state, newState: {templates: data}});

})

socket.on('changed_template', ({schema}) => {
    let parsedSchema = JSON.parse(schema),
    {rows , mode} = parsedSchema;

    updateState(model, {state: _state, newState: {rows, mode}});

})

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
