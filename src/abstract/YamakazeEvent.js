const EventEmitter = require('events');

class YamakazeEvent extends  EventEmitter {
    constructor(client) {
        super();
        this.client = client;
        if (this.constructor === YamakazeEvent) throw new TypeError('Abstract class "YamakazeEvent" cannot be instantiated directly.');
        if (this.name === undefined) throw new TypeError('Classes extending YamakazeEvent must have a getter "name"');
        if (this.once === undefined) throw new TypeError('Classes extending YamakazeEvent must have a getter "once"');
        if (this.run === undefined) throw new TypeError('Classes extending YamakazeEvent must implement an async function "run"');
        if (this.run.constructor.name !== 'AsyncFunction') throw new TypeError('Classes extending YamakazeEvent must implement "run" as async function');
        this.on('error', (error) => client.logger.error(error));
    }

    exec(...args) {
        this.run(...args)
            .catch(error => this.emit('error', error));
    }
}
module.exports = YamakazeEvent;
