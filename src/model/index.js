
import Kefir from 'kefir';
import def from './default';
import test from './test';
/*
  Singleton State Container (Global Model)
  ------------------------------
  This particular model/state container combines the latest change, combines this stream and feeds it to the view.
*/
export default Kefir.combine([def,test], 
               ({counter},{name, data}) => 
                    (
                        {
                            counter,
                            name,
                            data
                        }
                    )
                );
