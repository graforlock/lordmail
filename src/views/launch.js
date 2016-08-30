import React from 'react';
import Intents from '../actions/launch-creator';
import Prompt from './components/prompt';

const Launch = ({overlayClass}) => (
        <section className={overlayClass}>
                <div className="second-overlay"></div>
                <button onClick={Intents.launchCreator}>SwoonMailer</button>
                <small>version 0.1.0 alpha</small>
                <Prompt/>
        </section>  
);

export default Launch;