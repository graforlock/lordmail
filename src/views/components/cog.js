import React from 'react';

const Cog = ({editSettings}) => (
    <div id="cog" onClick={editSettings}>
        <p>Settings</p>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="circle"></div>
    </div>
);

export default Cog;