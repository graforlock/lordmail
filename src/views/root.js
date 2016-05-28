import React from 'react';
import Launch from './launch';
import Builder from './builder';

const Root = ({launched, prompt, builder: {rows, mode}}) => {
    let overlayClass = launched || prompt ? 'main-overlay hide' : 'main-overlay',
        builderShow = launched  || prompt ? true : false;
        console.log(prompt);
    return (
        <section>     
            <Launch overlayClass={overlayClass}/>
            <Builder show={builderShow} rows={rows} mode={mode} prompt={prompt}/>
        </section>
    );
}

export default Root;
