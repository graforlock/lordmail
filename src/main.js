import React from 'react';
import ReactDOM from 'react-dom';

import model$$ from './model/index';

import Root from './views/root';

model$$.onValue((appState) => {
  ReactDOM.render(
    <Root {...appState} />,
    document.getElementById('app')
  );
});

