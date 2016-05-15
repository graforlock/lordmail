import React from 'react';
import ReactDOM from 'react-dom';

import model from './model/index';
import test from './model/test';
import Root from './views/root';

import Kefir from 'kefir';

const model$$ = Kefir.combine([model,test], ({counter},{name}) => ({counter,name}));

model$$.onValue((appState) => {
  ReactDOM.render(
    <Root {...appState} />,
    document.getElementById('app')
  );
});

