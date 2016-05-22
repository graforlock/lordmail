
import Kefir from 'kefir';
import app from './app';
import builder from './builder';

/*
  Singleton State Container (Global Model)
  ------------------------------
  This particular model/state container combines the latest change, combines this stream and feeds it to the view.
*/

const global = Kefir
                 .combine([app, builder], 
                    ({launched}, builder) => 
                      (
                          {
                              launched,
                              builder
                          }
                      )
                  );
                
export default global;
