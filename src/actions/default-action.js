import { ReplaySubject } from 'rx';
import actions from './index';
import { flukt } from '../utils';

const intentSubject = new ReplaySubject(1);

export default {
  subject: intentSubject,
  defaultAction: function () {
    intentSubject.onNext({
      key: actions.DEFAULT_ACTION
    });
  }
};