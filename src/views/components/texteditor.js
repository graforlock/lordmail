import React, {Component} from 'react';
import codemirror from 'codemirror';
import javascript from 'codemirror/mode/css/css';

class TextEditor extends Component {
    constructor() {
        super();
    }
    handleValue(event) {
        console.log(event.target.value);
    }
    componentDidMount() {
       var myCodeMirror = codemirror.fromTextArea(document.getElementById('text-editor'), {
            value: "function myScript(){return 100;}\n",
            lineNumbers: true,
            mode:  "css"
        });
    }
    render() {
        return (
            <div>
                <hr className="no-bottom-margin"/>
                <textarea id="text-editor" defaultValue="Styles editor..." className="text-editor" onKeyPress={this.handleValue}></textarea>
            </div>
        )    
    }
}

export default TextEditor;