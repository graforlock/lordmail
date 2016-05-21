import Kefir from 'kefir';
import actions from './index';
import { ajax$, registerIntent, payload } from '../utils/index';

export default  {
  testAction: function(event) {
      registerIntent(
        actions.TEST_ACTION, 
        payload(event)
      )
  },
  promiseAction: function(event) {
        registerIntent(
          actions.PROMISE_ACTION, 
          ajax$({
              method: 'get',
              url: 'http://jsonplaceholder.typicode.com/posts/1'
          })
        )
  }
} 