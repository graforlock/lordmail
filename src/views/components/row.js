import React from 'react';

const Row = ({index, row, onChange, rowSchemas}) => {

let options = rowSchemas.map( (schema, index) => {
    return <option key={index} value={schema.name}>{schema.description}</option>;
});
 return (
     <div key={index}>
        <h5>row {index + 1}
        <select value={row.type ? row.type : 'select'} onChange={(event) => onChange(event,index)} name="options">
            <option value='select'>Please select a row type.</option> 
            { options }
        </select>
        </h5>
    </div>
 )   
};

export default Row;

