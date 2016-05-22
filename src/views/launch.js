import React from 'react';
import Intents from '../actions/launch-creator';

const Launch = ({overlayClass}) => (
        <div className={overlayClass}>
        <div className="second-overlay"></div>
           <button onClick={Intents.launchCreator}>lordmail.app</button>
           <small>version 0.1.0 alpha</small>
        </div>  
);

export default Launch;