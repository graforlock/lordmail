import React from 'react';
import Intents from '../../actions/launch-creator';

export default () => {
        const onKeyPress = (event) => {
                if(event.charCode == 13) {
                        Intents.getPrompt(event.target.value);
                }
        }
        return(
        <input name="prompt" className="launch-prompt" type="text" onKeyPress={onKeyPress} placeholder="Template name..."/>
        )
}

