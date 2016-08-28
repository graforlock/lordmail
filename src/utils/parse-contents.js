import partials from '../layout/partials/index'; 
import { template } from './template';
import { compose, join, map, strconcat as bundle } from './index';
import contentTypes from '../layout/types/index'; // This would be in SQLite

export default ({rows,mode}) => {
  // Destructuring the partials  
  let {row, menu, social, button, spacer} = partials;
  
  // Build and send the template to render
  const createRows = compose(join, map(row)); //-->  Functional composition: Template each row (functor is partially applied)
  let precompiled = bundle(
      menu(mode), // top section
      createRows(rows), // content section
      social, // bottom social section
      button(mode) // bottom button section
    );
    
  let compiled = template(precompiled, contentTypes);
 
  return compiled;  

}