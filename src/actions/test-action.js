import Kefir from 'kefir';
import actions from './index';
import pool from './pool';
import { ajax$, registerIntent, emit } from '../utils/index';

export default  {
  testAction: function(event) {
    pool.plug(
      registerIntent(
        actions.TEST_ACTION, 
        emit(event)
      )
    );
  },
  promiseAction: function(event) {
    pool.plug(
        registerIntent(
          actions.PROMISE_ACTION, 
          ajax$({
              method: 'get',
              url: 'http://jsonplaceholder.typicode.com/posts/1'
          })
        )
    )
  }
} 