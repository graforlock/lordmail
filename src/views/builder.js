import React, {Component} from 'react';
import {LOCALHOST, RENDER_PATH} from '../../constants/index';
import Toggle from './components/toggle';
import TextEditor from './components/texteditor';
import Row from './components/row';
import render from '../actions/render-template';
import email from '../actions/send-email';
import io from 'socket.io-client';
import TemplateList from './components/tpllist';


class Builder extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            rows: props.rows,
            mode: props.mode,
            templates: props.templates,
            editing: false,
     	    styleContent: ""
        }
    }
    addRow() {
        let rows = this.state.rows;
        rows.push({});
        this.setState({rows});
    }
    activeMode(mode) {
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
    saveStyles() {
	this.socket.emit('save_styles',this.state.styleContents);
    }
    editStyles = () => {
        let editing = this.state.editing;
        this.setState({editing: !editing});    
    }
    sendEmail = (event) => {
        let address = prompt('Please enter your valid email address:'),
            regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(regex.test(address)) {
            email.sendEmail({data: {rows: this.state.rows}, address});
        } else {
            alert('Invalid email address given: ' + address);
        }
    }
    render() {
        let show = `${this.props.show}`,
            rows = this.state.rows.map( (row, index) => {
           return  <Row index={index} key={index} onChange={this.onChange.bind(this)}/>
        });

        let templates = this.props.templates ? this.props.templates : [],
            templateName = this.props.prompt || new Date().toDateString();

        return (
            <div className={`launch ${show}`}>
                <p id='data' style={{position : 'fixed', top: 0, left: '50%', zIndex: 1000000}}></p>
                <iframe width="600" height="1000" src={RENDER_PATH}></iframe>
                <aside onMouseDown={this.dragStart.bind(this)} className="sidebar">
                    <div><h5>Template: {templateName}</h5></div>
                    <hr/>
                    <section id="drag-handle" className="drag-handle"></section>
                    <div ><h5>transactional<Toggle active={this.state.mode} onClick={this.activeMode.bind(this)} mode="trans"/></h5></div>
                    <div ><h5>menu<Toggle active={this.state.mode} onClick={this.activeMode.bind(this)} mode="menu"/></h5></div>
                    <div ><h5></h5></div>
                    <hr/>
                    <div onClick={this.addRow.bind(this)}><h5 className="add-row">add row</h5></div>
                    { rows }
                    <hr/>
                    <div >
                        <button onClick={() => render.renderTemplate({data: {rows: this.state.rows, mode: this.state.mode}, destination: templateName})} className="render-button">render</button>
                        <button onClick={this.sendEmail} className="render-button">send email</button>
                        <button onClick={this.editStyles} className="render-button">edit styles</button>
                        <button onClick={this.saveStyles.bind(this)} className="render-button">save styles</button>
                    </div>
                    <TemplateList  templates={this.props.templates}/>
                    <TextEditor editing={this.state.editing} onStyleEdit={this.onStyleEdit.bind(this)} />
                </aside>
            </div>      
        );
        
    }
}


export default Builder;
