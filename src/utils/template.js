import * as fs from 'fs';
import layout from '../layout/base-layout';
import io from 'socket.io-client';
import config from '../layout/config';
import { LOCALHOST } from '../../constants/index';

export const template = (tpl, data) => {
        let regex = /{{([^}}]+)?}}/g,
            match;
        while(match = regex.exec(tpl)) {
            tpl = tpl.replace(match[0], data[match[1]]);
        }
        return tpl;
}

export const repeat = (times) =>  {
    return {
        html: (content) => {
            let stringResult = []; 
            for(let i = 0; i < times; i++) {
                stringResult.push(content);
            }
            return stringResult.join('');
        }
    }
};

export const buildTemplate = (content) => {
   return `${layout.head}
             ${content}
           ${layout.footer}`;
}


export const exportTemplate = (content, options) => {
    socket.emit('build_template', _layout);
}
// export const adjustChild = new Function('size', 'if(parseInt(size)) { return size - 20; } else { console.warn("Size was \'" + size + "\' which is " + typeof size + ". Argument should be of type number.")}'); 

