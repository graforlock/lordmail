import React from 'react';

const TemplateList = ({templates}) => {
    if(!templates.length) {
        return <li></li>;
    }
    let templateList = templates.map((template,index) => {
        return <h5 className="template-item" key={index}>{template}</h5>;
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
