import React, {Component} from 'react';
import Toggle from './components/toggle';
import Row from './components/row';
import {between} from '../utils/index';
import render from '../actions/render-template';
import email from '../actions/send-email';
import io from 'socket.io-client';

class Builder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: props.rows,
            mode: props.mode
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
        window.addEventListener('mouseup', this.dragEnd.bind(this));
        window.addEventListener('mousemove', this.dragMove.bind(this));

    }
    componentDidUpdate() {
        const socket = io.connect('http://localhost:8080');
        socket.on('created_template', function() {
            document.querySelector('iframe').contentWindow.location.reload();                
        });   
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
            this.target.currentTarget.style.width = ((window.innerWidth - event.screenX) +5) + 'px';
            document.querySelector('iframe').width = event.screenX -5;
            this.adjustFrameHeight();
        }
    }
    dragStart(event) {
        let ev = Object.assign({}, event);
        let target = ev.currentTarget;
        this.target = ev;
        this.dragPoint = window.innerWidth - target.offsetWidth;
        if(between(event.pageX, this.dragPoint)) {
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
    sendEmail = (event) => {
        let address = prompt('Please enter your valid email address:'),
            regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(regex.test(address)) {
            email.sendEmail({rows: this.state.rows, recipent: address});
        } else {
            alert('Invalid email address given: ' + address);
        }
    }
    render() {
        let show = `${this.props.show}`;
        let rows = this.state.rows.map( (row, index) => {
           return  <Row index={index} key={index} onChange={this.onChange.bind(this)}/>
        });
        return (
            <div className={`launch ${show}`}>
                <iframe width="977" height="1000" src="test.html"></iframe>
                <aside onMouseDown={this.dragStart.bind(this)} className="sidebar">
                    <section className="drag-handle"></section>
                    <div ><h5>transactional<Toggle active={this.state.mode} onClick={this.activeMode.bind(this)} mode="trans"/></h5></div>
                    <div ><h5>menu<Toggle active={this.state.mode} onClick={this.activeMode.bind(this)} mode="menu"/></h5></div>
                    <div ><h5>weekly button<Toggle active={this.state.mode} onClick={this.activeMode.bind(this)} mode="weekly"/></h5></div>
                    <hr/>
                    <div onClick={this.addRow.bind(this)}><h5 className="add-row">add row</h5></div>
                    { rows }
                    <hr/>
                    <div >
                        <button onClick={() => render.renderTemplate({rows: this.state.rows})} className="render-button">render</button>
                        <button onClick={this.sendEmail} className="render-button">send email</button>
                    </div>
                </aside>
            </div>      
        );
        
    }
}


export default Builder;