import React from 'react';

const TemplateList = ({templates, onTemplateClick}) => {
    if(!templates) return <li></li>;

    const templateList = templates.map((template,index) => {
        let name = Object.keys(template)[0];
        return <h5 className="template-item" onClick={() => onTemplateClick(name)} key={index}>{name}</h5>;
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
