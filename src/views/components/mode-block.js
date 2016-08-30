import React from 'react';
import Toggle from './toggle';

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
        <div>
            <h5>weekly<Toggle active={mode} 
                            onClick={activeMode} 
                            mode="weekly"/>
            </h5>
        </div>
        <hr/>
    </section>
);

export default ModeBlock;