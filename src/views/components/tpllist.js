import React from 'react';

const TemplateList = ({templates}) => {
    if(!templates) {
        return <li></li>;
    }
    let templateList = templates.map((template,index) => {
        let name = Object.keys(template)[0];
        return <h5 className="template-item" key={index}>{name}</h5>;
    });
    return(
        <div> 
           <hr/>
           <div className={`template-list`}>    
               <h5> Template list: </h5>
               { templateList } 
           </div>
        </div>
          );

}
export default TemplateList;
