import React, {Component} from 'react';
import {LOCALHOST, RENDER_PATH, VALID_MAIL} from '../../constants/index';

import render from '../actions/render-template';
import email from '../actions/send-email';

import io from 'socket.io-client';

import AddRow from './components/add-row';
import BackToMain from './components/back-to-main';
import ButtonBlock from './components/button-block';
import Caption from './components/caption';
import Cog from './components/cog';
import ModeBlock from './components/mode-block';
import Row from './components/row';
import Settings from './components/settings';
import TextEditor from './components/texteditor';
import TemplateList from './components/template-list';


class Builder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templates: props.templates,
            editing: false,
     	    styleContent: "",
            name: props.prompt,
            rendered: false,
            settingsVisible: false
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
    //-> 2). Unbound parent methods :
    dragEnd(event) {
        this.dragging = false;
    }
    dragMove(event) {
        if(this.dragging === true) {
            this.target.currentTarget.style.width = (window.innerWidth - event.pageX ) + 'px';
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
        
        let rows = this.props.rows;
        rows[index].type = event.target.value;
        render.updateSchema({rows, mode: this.props.mode});
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
        let rows = this.props.rows;
        rows.push({});
        render.updateSchema({mode: this.props.mode, rows});
    }
    removeRow = () => {
        if(!this.props.rows.length) return;
        
        let rows = this.props.rows;
            rows.splice(rows.length - 1, 1);
        render.updateSchema({mode: this.props.mode, rows});
    }
    activeMode = (mode) => {
        let _modeState = this.props.mode;
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
        render.updateSchema({rows : this.props.rows, mode: _modeState});
    }
    onTemplateClick = (name) => {
        this.socket.emit('change_template', name);
        this.setState({name});
    }
    saveStyles = () => {
        this.socket.emit('save_styles',this.state.styleContents);
    }
    renderTemplate = () => {
        if(!this.state.rendered) this.setState({rendered: true});

        let templateName = this.state.name || new Date().toDateString();
        render.renderTemplate({data: {rows: this.props.rows, mode: this.props.mode}, destination: templateName})
    }
    editStyles = () => {
        let editing = this.state.editing;
        this.setState({editing: !editing});    
    }
    editSettings = () => {  
        this.setState({settingsVisible: !this.state.settingsVisible})
    }
    sendEmail = (event) => {
        let address = prompt('Please enter your valid email address:'),
            regex = VALID_MAIL;
        if(regex.test(address)) {
            email.sendEmail({data: {rows: this.props.rows}, address});
        } else {
            alert('Invalid email address given: ' + address);
        }
    }
    render() {

        let rows = this.props.rows.map( (row, index) => {
                if(index < this.props.rows.length) {
                    return  <Row index={index} key={index} row={row} rowSchemas={this.props.rowSchemas} onChange={this.onChange.bind(this)}/>
                } else {
                    return  <hr/>
                }
            });

        let templates = this.props.templates ? this.props.templates : [],
            templateName = this.state.name || new Date().toDateString();

        return (
            <section className={`launch true`}>
                <p id='data' style={{position : 'fixed', top: 0, left: '50%', zIndex: 1000000}}></p>
                <div style={{height: 700, overflow: 'scroll', position: 'relative'}}>
                    <iframe width="600" height="700" scrolling="no" src={this.state.rendered ? RENDER_PATH : ''}></iframe>
                </div>
                <aside onMouseDown={this.dragStart.bind(this)} className="sidebar">
                    <Caption name={templateName} />
                    <div id="drag-handle" className="drag-handle"></div>
                    <ModeBlock mode={this.props.mode} activeMode={this.activeMode} />
                    <AddRow addRow={this.addRow} removeRow={this.removeRow} />
                    { rows }
                    <ButtonBlock saveStyles={this.saveStyles} renderTemplate={this.renderTemplate} 
                                 sendEmail={this.sendEmail} editStyles={this.editStyles} />
                    <TemplateList  templates={this.props.templates} 
                                   onTemplateClick={this.onTemplateClick} />
                    <TextEditor editing={this.state.editing} 
                                onStyleEdit={this.onStyleEdit.bind(this)} 
                                editStyles={this.editStyles}/>
                </aside>
                <Cog editSettings={this.editSettings} />
                <Settings editSettings={this.editSettings} settingsVisible={this.state.settingsVisible}/>
                <BackToMain />
            </section>      
        );
        
    }
}


export default Builder;
