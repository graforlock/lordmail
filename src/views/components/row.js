import React from 'react';


const Row = ({index}) => {
 return (
     <div key={index}>
        <h5>row {index + 1}
        <select name="options">
            <option value="1col">Full-width Column Row</option>
            <option value="txtcol">Text Column Row (Full-width)</option>
            <option value="2col">Two Column Row</option>
            <option value="3col">Three Column Row (Orphan)</option>
            <option value="6col">Three Column Row (Stack)</option>
            <option value="lsidebar">Sidebar Row</option>
            <option value="rsidebar">Sidebar Row(Reverse)</option>
        </select>
        </h5>
    </div>
 )   
};

export default Row;

