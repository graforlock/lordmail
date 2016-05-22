import React, {Component} from 'react';
import Toggle from './components/toggle';
import Row from './components/row';
import {between} from '../utils/index';
import render from '../actions/render-template';

class Builder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: props.rows,
            mode: {
                trans: false,
                menu: false,
                weekly: false
            }
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
            console.log(event.screenX);
            document.querySelector('iframe').width = event.screenX;
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
    render() {
        let show = `${this.props.show}`;
        let rows = this.state.rows.map( (row, index) => {
           return  <Row index={index} key={index} />
        });
        return (
            <div className={`launch ${show}`}>
                <iframe width="977" frameborder="0" height="1000" style={{border: 'none', margin: 0 -12}} src="table.html"></iframe>
                <aside onMouseDown={this.dragStart.bind(this)} className="sidebar">
                    <section className="drag-handle"></section>
                    <div onClick={this.addRow.bind(this)}><h5>transactional<Toggle active={this.state.mode} onClick={this.activeMode.bind(this)} mode="trans"/></h5></div>
                    <div onClick={this.addRow.bind(this)}><h5>menu<Toggle active={this.state.mode} onClick={this.activeMode.bind(this)} mode="menu"/></h5></div>
                    <div onClick={this.addRow.bind(this)}><h5>weekly button<Toggle active={this.state.mode} onClick={this.activeMode.bind(this)} mode="weekly"/></h5></div>
                    <hr/>
                    <div onClick={this.addRow.bind(this)}><h5 className="add-row">add row</h5></div>
                    { rows }
                    <hr/>
                    <div ><button onClick={render.renderTemplate} className="render-button">render</button></div>
                </aside>
            </div>      
        );
        
    }
}


export default Builder;