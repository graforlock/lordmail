import React from 'react';
import action from '../actions/default-action';

const Root = props => {
    return (
        <div><h1>Hey Ho {props.counter}</h1>
        <button onClick={action.defaultAction}>click me</button>
        </div>  
    );
}


export default Root;