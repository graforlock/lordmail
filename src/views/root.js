import React from 'react';
import Launch from './launch';
import Builder from './builder';

const Root = ({launched, builder}) => {
    let overlayClass = launched ? 'main-overlay hide' : 'main-overlay',
        builderShow = launched;
    return (
        <section>     
            <Launch overlayClass={overlayClass} />
            <Builder show={builderShow} rows={builder.rows}/>
        </section>
    );
}


export default Root;
