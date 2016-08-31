import React from 'react';

const AddRow = ({addRow, removeRow}) => (
    <section>
        <div onClick={addRow}>
            <h5 className="add-row">add row</h5>
        </div>
        <div onClick={removeRow}>
            <h5 className="remove-row">remove row</h5>
        </div>
    </section>
);

export default AddRow;