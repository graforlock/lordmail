export default function(value) {
    var listeners = [];
    function notify(newValue) {
        for(let i = 0; i < listeners.length; i++) {
            listeners[i](newValue);
        }
    }
    this.value = value;
    function accessor(newValue) {
        if(arguments.length && newValue !== value) {
            this.value = newValue;
            notify(newValue);
        }
        return this.value;
    }

    accessor.subscribe = function(subscriber) {
       listeners.push(subscriber);
    }
    return accessor;
}