import partials from '../layout/partials/index'; 
import { template } from './template';
import { compose, join, map, strconcat as bundle } from './index';
import contentTypes from '../layout/types/index'; //-> This would be in SQLite (!!!)

export default ({rows,mode}) => {
  //-> Destructuring the partials  
  let {row, menu, social, button, spacer} = partials;
  
  //-> Build and send the template to render
  const createRows = compose(join, map(row)); 

  let precompiled = bundle(
      menu(mode), //-> Top (nav) section
      createRows(rows), //-> Content (row) section
      social, //-> Bottom social section
      button(mode) //-> Bottom button section
    );
    
  return template(precompiled, contentTypes);

}