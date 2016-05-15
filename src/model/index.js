
import Kefir from 'kefir';
import def from './default';
import test from './test';

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
