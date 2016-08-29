import { Singleton } from '../../utils/decorators';
import { updateState } from '../../utils/index';
import { buildTemplate } from '../../utils/template';
import parseContents from '../../utils/parse-contents';
import io from 'socket.io-client';
import { LOCALHOST } from '../../../constants/index';

const socket = io.connect(LOCALHOST);

export const builderProvider = Singleton(function({ _state, model }) {
    this._state = _state;
    this.model = model;
    return {
        renderTemplate: ({ data, destination }) => {
            let compiled = parseContents(data);
            socket.emit('build_template', buildTemplate(compiled),
                destination, { rows: this._state.rows, mode: this._state.mode })
            updateState(this.model, { state: this._state, newState: data });

        },
        sendTemplate: ({ data, address }) => {
            let compiled = parseContents(data);
            socket.emit('send_email', buildTemplate(compiled),
                address)
            updateState(this.model, { state: this._state, newState: data });

        },
        onTemplateList: () => {
            socket.on('template_list', data => {
                updateState(this.model, { state: this._state, newState: { templates: data } });
            })
        },
        onChangedTemplate: () => {
            socket.on('changed_template', ({ schema }) => {
                let parsedSchema = JSON.parse(schema),
                    { rows, mode } = parsedSchema;
                updateState(this.model, { state: this._state, newState: { rows, mode } });

            })
        }

    }
});

export const appProvider = Singleton(function({ _state, model }) {
    this._state = _state;
    this.model = model;
    return {
        launchCreator: () => {
            updateState(model, { state: _state, newState: { launched: !_state.launched } });
        },
        getPromptvalue: (prompt) => {
            updateState(model, { state: _state, newState: { prompt } });

        }
    }
});