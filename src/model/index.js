import { ReplaySubject } from 'rx';

import actions from '../actions';
import Intent from '../actions/default-action';

const subject = new ReplaySubject(1);

let state = {
  counter: 0,
  list: [],
  filterEvens: true
};

const defaultAction = () => {
  state = Object.assign({}, {
    counter: state.counter + 1,
    list: state.list.concat(state.counter),
    filterEvens: !state.filterEvens
  });
  subject.onNext(state);
}

const addAction = () => {
  alert('add');
}

Intent.subject.subscribe(function (payload) {
  switch(payload.key) {
    case actions.DEFAULT_ACTION:
      defaultAction();
      break;
    case actions.ADD_ACTION:
      addAction();
      break;
    default:
      console.warn(`${payload.key} not recognized in model.`);
  }
});

subject.onNext(state);

export default {
  subject: subject
};