import React from 'react';

const Row = ({index, row, onChange}) => {
 return (
     <div key={index}>
        <h5>row {index + 1}
        <select value={row.type ? row.type : 'select'} onChange={(event) => onChange(event,index)} name="options">
            <option value="select">Select a column schema.</option>
            <option value="col1">Full-width Column Row</option>
            <option value="txtcol">Text Column Row (Full-width)</option>
            <option value="col2">Two Column Row</option>
            <option value="col3">Three Column Row (Orphan)</option>
            <option value="col6">Three Column Row (Stack)</option>
            <option value="lsidebar">Sidebar Row</option>
            <option value="rsidebar">Sidebar Row(Reverse)</option>
            <option value="rzigzag">Zig Zag (Right to Left)</option>
            <option value="lzigzag">Zig Zag (Left to Right)</option>
            <option value="spacer">Spacer</option>
        </select>
        </h5>
    </div>
 )   
};

export default Row;

