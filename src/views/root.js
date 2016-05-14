import React from 'react';
import action from '../actions/default-action';

const Root = props => {
    let history = props.list.filter(item => {
        return item % 2 === 0; 
    }).map((item,index) => (
      <p key={index}>{ item }</p>  
    ));
    return (
        <div><h1>Hey Ho {props.counter}</h1>
        <button onClick={action.defaultAction}>click me</button>
        <button onClick={action.addAction}>add action</button>
        { history }
        </div>  
    );
}


export default Root;