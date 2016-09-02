import React, {Component} from 'react';
// Actions for saving new stuff to SQLite

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settingsVisible: props.settingsVisible
        }
    }
    render() {
        let className = this.props.settingsVisible ? 'visible'  : '';
        return(
            <div id="settings" className={className}>
                <label htmlFor="row-name">New Row name: </label>
                <input type="text" placeholder="Row type..." id="row-name" name="row-name" />
                <label htmlFor="row-content">Row Content: </label>
                <textarea rows="10" cols="100" defaultValue="Add a new row to the database..." id="row-content" name="row-content"></textarea>
                <button className="render-button" onClick={this.props.editSettings}>Close</button>
            </div>
        )
    }
}

export default Settings;