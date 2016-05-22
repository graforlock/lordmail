import * as fs from 'fs';
import layout from '../layout/index';
import axios from 'axios';

export const template = (tpl, data) => {
        let regex = /{{([^}}]+)?}}/g,
            match;
        while(match = regex.exec(tpl)) {
            tpl = tpl.replace(match[0], data[match[1]]);
        }
        return tpl;
}
            
export const buildTemplate = (content) => {
    axios({
        method: 'post',
        url: 'http://localhost:8080',
        data: {
            layout: `${layout.head}${content}${layout.footer}`,
            filename: 'test.html'
        }
    });
}
// export const adjustChild = new Function('size', 'if(parseInt(size)) { return size - 20; } else { console.warn("Size was \'" + size + "\' which is " + typeof size + ". Argument should be of type number.")}'); 

