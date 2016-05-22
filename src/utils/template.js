import * as fs from 'fs';
import layout from '../layout/index';
import io from 'socket.io-client';

export const template = (tpl, data) => {
        let regex = /{{([^}}]+)?}}/g,
            match;
        while(match = regex.exec(tpl)) {
            tpl = tpl.replace(match[0], data[match[1]]);
        }
        return tpl;
}
            
export const buildTemplate = (content) => {
    let _layout = `${layout.head}${content}${layout.footer}`;
    const socket = io.connect('http://localhost:8080');
    socket.emit('build_template', _layout);
    
}
// export const adjustChild = new Function('size', 'if(parseInt(size)) { return size - 20; } else { console.warn("Size was \'" + size + "\' which is " + typeof size + ". Argument should be of type number.")}'); 

