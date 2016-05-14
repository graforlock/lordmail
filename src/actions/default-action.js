import { Subject } from 'rx';
import actions from './index';

const intentSubject = new Subject();

export default {
  subject: intentSubject,
  defaultAction: function () {
    intentSubject.onNext({
      key: actions.DEFAULT_ACTION
    });
  },
  addAction: function () {
    intentSubject.onNext({
      key: actions.ADD_ACTION
    });
  }
};