import React from 'react';

const AddRow = ({addRow}) => (
    <div onClick={addRow}>
        <h5 className="add-row">add row</h5>
    </div>
);

export default AddRow;