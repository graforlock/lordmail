import React, {Component} from 'react';
import {LOCALHOST, RENDER_PATH, VALID_MAIL} from '../../constants/index';
// One step, instead of two??
import render from '../actions/render-template';
import email from '../actions/send-email';

import io from 'socket.io-client';

import AddRow from './components/add-row';
import ButtonBlock from './components/button-block';
import ModeBlock from './components/mode-block';
import Row from './components/row';
import Toggle from './components/toggle';
import TextEditor from './components/texteditor';
import TemplateList from './components/template-list';


class Builder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: props.rows,
            mode: props.mode,
            templates: props.templates,
            editing: false,
     	    styleContent: ""
        }
    }
    //-> 1). Lifecycle methods :
    componentDidMount() {
        this.socket = io.connect(LOCALHOST);
        this.socket.on('created_template', function(res) {
            document.querySelector('iframe').contentWindow.location.reload();                
        });   
        window.addEventListener('mouseup', this.dragEnd.bind(this));
        window.addEventListener('mousemove', this.dragMove.bind(this));
        setTimeout(() => {
            this.adjustFrameHeight();
        },1000);
        
    }
    componentWillUnmount() {
        window.removeEventListener('mouseup', this.dragEnd.bind(this));
        window.removeEventListener('mousemove', this.dragMove.bind(this));
    }
    componentWillReceiveProps({rows, mode}) {
        if(rows && mode) {
            this.setState({rows, mode});
        }
    }
    //-> 2). Unbound parent methods :
    dragEnd(event) {
        this.dragging = false;
    }
    dragMove(event) {
        if(this.dragging === true) {
            this.target.currentTarget.style.left = (event.pageX ) + 'px';
            document.querySelector('iframe').width = (event.pageX ) + 'px';
            this.adjustFrameHeight();
        }
    }
    dragStart(event) {
        let ev = Object.assign({}, event);
        let target = ev.currentTarget;
        this.target = ev;
        this.dragPoint = event.screenX;
        if(event.target.id === 'drag-handle') {
                this.dragging = true;
        }
    }
    adjustFrameHeight() {
        let iframe = document.querySelector('iframe');
        iframe.height= "";
        iframe.height = iframe.contentWindow.document.body.scrollHeight;
    }
    onChange(event, index) {
        if(event.target.value === 'select') return;
        
        let rows = this.state.rows;
        rows[index].type = event.target.value;
        this.setState({rows})
    }
    onStyleEdit(currentValue) {
        let iframeContents = document.querySelector('iframe').contentWindow.document;
        let editorStyles = iframeContents.getElementById('editor-styles');
        if(editorStyles) {
            editorStyles.innerHTML = "";
            editorStyles.innerHTML = currentValue;
        } else {
            let editorStyles = document.createElement('style');
            editorStyles.id = 'editor-styles';
            editorStyles.innerHTML = currentValue;
            iframeContents.body.appendChild(editorStyles);   
        }
	this.setState({styleContents: currentValue});
    }
    //-> 3). Bound parent methods :
    addRow = () => {
        let rows = this.state.rows;
        rows.push({});
        this.setState({rows});
    }
    activeMode = (mode) => {
        let _modeState = this.state.mode;
        switch(mode) {
            case 'trans':
                _modeState.trans = !_modeState[mode];
                break;
            case'menu' :
                _modeState.menu = !_modeState[mode];
                break;
            case 'weekly': 
                _modeState.weekly= !_modeState[mode];
                break;
        }
        this.setState({mode: _modeState});
    }
    onTemplateClick = (name) => {
        this.socket.emit('change_template', name);
    }
    saveStyles = () => {
        this.socket.emit('save_styles',this.state.styleContents);
    }
    renderTemplate = () => {
        render.renderTemplate({data: {rows: this.state.rows, mode: this.state.mode}, destination: templateName})
    }
    editStyles = () => {
        let editing = this.state.editing;
        this.setState({editing: !editing});    
    }
    sendEmail = (event) => {
        let address = prompt('Please enter your valid email address:'),
            regex = VALID_MAIL;
        if(regex.test(address)) {
            email.sendEmail({data: {rows: this.state.rows}, address});
        } else {
            alert('Invalid email address given: ' + address);
        }
    }
    render() {
        let show = `${this.props.show}`,
            rows = this.state.rows.map( (row, index) => {
                if(index < this.state.rows.length) {
                    return  <Row index={index} key={index} row={row} onChange={this.onChange.bind(this)}/>
                } else {
                    return  <hr/>
                }
            });

        let templates = this.props.templates ? this.props.templates : [],
            templateName = this.props.prompt || new Date().toDateString();

        return (
            <section className={`launch ${show}`}>
                <p id='data' style={{position : 'fixed', top: 0, left: '50%', zIndex: 1000000}}></p>
                <iframe width="600" height="1000" src={RENDER_PATH}></iframe>
                <aside onMouseDown={this.dragStart.bind(this)} className="sidebar">
                    <Caption name={templateName} />
                    <section id="drag-handle" className="drag-handle"></section>
                    <ModeBlock mode={this.state.mode} activeMode={this.activeMode} />
                    <AddRow addRow={this.addRow} />
                    { rows }
                    <ButtonBlock saveStyles={this.saveStyles} renderTemplate={this.renderTemplate} 
                                 sendEmail={this.sendEmail} editStyles={this.editStyles} />
                    <TemplateList  templates={this.props.templates} 
                                   onTemplateClick={this.onTemplateClick} />
                    <TextEditor editing={this.state.editing} 
                                onStyleEdit={this.onStyleEdit.bind(this)} />
                </aside>
            </section>      
        );
        
    }
}


export default Builder;
