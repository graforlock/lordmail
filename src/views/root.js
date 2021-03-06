import React from 'react';
import Launch from './launch';
import Builder from './builder';

const Root = ({launched, prompt, rows, mode, templates, rowSchemas}) => {
    let overlayClass = launched || prompt ? 'main-overlay hide' : 'main-overlay',
        builderShow = launched  || prompt ? true : false;
    return (
        <section>     
            <Launch overlayClass={overlayClass}/>
            {builderShow ? <Builder rows={rows} mode={mode} 
                                    prompt={prompt} rowSchemas={rowSchemas} 
                                    templates={templates} /> : <div></div>}
        </section>
    );
}

export default Root;
