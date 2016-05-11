import React from 'react';
import Rx from 'rx';
import Model from './model';
import Root from './views/root';
import ReactDOM from 'react-dom';

const AppObservable = Rx.Observable.combineLatest(
 Model.subject,
  function (
    model
  ) {
    return {
      model 
     };
  }
);

Model.subject.subscribe((appState) => {
  ReactDOM.render(
    <Root {...appState}/>,
    document.getElementById('app')
  );
});