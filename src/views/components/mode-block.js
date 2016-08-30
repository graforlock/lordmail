import React from 'react';

const ModeBlock = ({mode, activeMode}) => (
    <section>
        <div>
            <h5>transactional<Toggle active={mode} 
                                        onClick={activeMode} 
                                        mode="trans"/>
            </h5>
        </div>
        <div>
            <h5>menu<Toggle active={mode} 
                            onClick={activeMode} 
                            mode="menu"/>
            </h5>
        </div>
        <hr/>
    </section>
);

export default ModeBlock;