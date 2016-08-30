import { Singleton } from '../../utils/decorators';
import { updateState } from '../../utils/index';
import { buildTemplate } from '../../utils/template';
import parseContents from '../../utils/parse-contents';
import io from 'socket.io-client';
import { LOCALHOST } from '../../../constants/index';

const socket = io.connect(LOCALHOST);

export const builderProvider = Singleton(function(State) {
    this.state = State.state;
    return {
        renderTemplate: ({ data, destination }) => {
            let compiled = parseContents(data),
                { rows, mode } = data;
            socket.emit('build_template', buildTemplate(compiled),
                destination, { rows, mode });
            State.updateState({ rows, mode });

        },
        sendTemplate: ({ data, address }) => {
            let compiled = parseContents(data);
            socket.emit('send_email', buildTemplate(compiled),
                address)
            State.updateState({ data });

        },
        updateSchema: ({rows, mode}) => {
            State.updateState({rows, mode});
        },
        onTemplateList: () => {
            socket.on('template_list', templates => {
                State.updateState({ templates });
            })
        },
        onChangedTemplate: () => {
            socket.on('changed_template', ({ schema }) => {
                let parsedSchema = JSON.parse(schema),
                    { rows, mode } = parsedSchema;
                State.updateState({ rows, mode });
            })
        }

    }
});

export const appProvider = Singleton(function(State) {
    this.state = State.state;
    return {
        launchCreator: () => {
            State.updateState({ launched: !this.state.launched });
        },
        getPromptvalue: (prompt) => {
            State.updateState({ prompt })
        }
    }
});

export const stateProvider = function(state) {
    //-> stateProvider is a simplified Subject of Observer :
   this.state = state;
   this.subscribers = [];
}

stateProvider.prototype.updateState = function(newState) {
    let _state = {...this.state, ...newState};
    if(_state !== this.state) {
        this.state = _state;
        this.notify(_state);
    }
}

stateProvider.prototype.notify = function(newState) {
    newState = newState || this.state;
    for(let i = 0; i < this.subscribers.length; i++) {
        this.subscribers[i](newState);
    }
}

stateProvider.prototype.subscribe = function(subscriber) {
    //-> Observer(s) subscription :
    this.subscribers.push(subscriber);
}