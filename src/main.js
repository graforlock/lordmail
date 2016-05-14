import React from 'react';
import model from './model';
import Root from './views/root';
import ReactDOM from 'react-dom';

// const AppObservable = Rx.Observable.combineLatest(
//  Model.subject,
//   function (
//     model
//   ) {
//     return {
//       model 
//      };
//   }
// );

model.onValue((appState) => {
  ReactDOM.render(
    <Root {...appState} />,
    document.getElementById('app')
  );
});

model.offValue();