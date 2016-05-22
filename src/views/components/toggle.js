import React from 'react';

const Toggle = ({onClick, active, mode}) => {
    let isActive = active[mode] ? 'active' : '';
    return(
        <span className={isActive} onClick={() => onClick(mode)}></span>
    );
}

export default Toggle;