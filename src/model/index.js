
import Kefir from 'kefir';
import app from './app';
import builder from './builder';


const appState = Kefir.combine([app, builder], 
                    ({launched, prompt}, builder) => 
                      ({ launched,
                         prompt,
                         builder }));
                
export default appState;
