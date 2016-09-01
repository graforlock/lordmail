import React, {Component} from 'react';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settingsVisible: props.settingsVisible
        }
    }
    render() {
        if(!this.props.settingsVisible) return <div></div>;

        return(
            <div id="settings">
                <textarea defaultValue="Add a new row to the database..."></textarea>
                <input type="text" placeholder="Row type..." />
            </div>
        )
    }
}

export default Settings;