import React from 'react';
import launch from '../../actions/launch-creator';

const BackToMain = () => (
    <button className="render-button back-to-main" onClick={launch.backToMain} >Back to main</button>
);

export default BackToMain;