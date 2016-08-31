import partials from '../layout/partials/index'; 
import { compose, join, map, strconcat as bundle } from './index';
import layout from '../layout/base-layout';

class Parser {
  constructor(rowSchemas){
    this.rowSchemas = {};
    for(let i = 0; i < rowSchemas.length; i++) {
      this.rowSchemas[rowSchemas[i].name] = rowSchemas[i].content;
    }
  }  
   static buildTemplate(content){
    return `${layout.head}
              ${content}
            ${layout.footer}`;
  }
  parse({rows, mode}) {
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
      
    return this.template(precompiled, this.rowSchemas);

  }
  repeat(times){
    return {
        html: (content) => {
            let stringResult = []; 
            for(let i = 0; i < times; i++) {
                stringResult.push(content);
            }
            return stringResult.join('');
        }
    }
  }
  template(tpl, data) {
        let regex = /{{([^}}]+)?}}/g,
            match;
        while(match = regex.exec(tpl)) {
            tpl = tpl.replace(match[0], data[match[1]]);
        }
        return tpl;
  }
}

export default Parser;