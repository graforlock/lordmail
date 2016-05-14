import React from 'react';
import Intents from '../actions/default-action';

const Root = props => {
    console.log(props);
    return (
        <div><h1>Hey Ho {props.counter}</h1>
        <button onClick={Intents.defaultAction}>click me</button>

        </div>  
    );
}


export default Root;
