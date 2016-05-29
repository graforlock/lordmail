import React, {Component} from 'react';
import codemirror from 'codemirror';
import javascript from 'codemirror/mode/css/css';

class TextEditor extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
       this.editor = codemirror.fromTextArea(document.getElementById('text-editor'), {
            value: "function myScript(){return 100;}\n",
            lineNumbers: true,
            mode:  "css"
        });
        this.editor.on("change", (editor, change) => {
           this.props.onStyleEdit(this.editor.getValue());
        });
    }
    render() {
        return (
            <div>
                <hr className="no-bottom-margin"/>
                <textarea id="text-editor" defaultValue="/* Custom Styles */" className="text-editor" ></textarea>
            </div>
        )    
    }
}

export default TextEditor;