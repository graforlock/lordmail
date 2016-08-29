export const Singleton = (Instance) => {
    return (() => {  
        var instance,
            module = Instance;
        return {
            getInstance: (options) => {
                if(!instance) {
                    instance = new module(options);
                }
                return instance;
            }
        }
    })();
}