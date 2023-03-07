const uuid = require('uuid');

class YamakazeInteraction {
    constructor(client) {
        this.uid = uuid.v4();
        this.client = client;
        this.category = null;
        if (this.constructor === YamakazeInteraction) throw new TypeError('Abstract class "YamakazeInteraction" cannot be instantiated directly.'); 
        if (this.name === undefined) throw new TypeError('Classes extending YamakazeInteraction must have a getter "name"');
        if (this.description === undefined) throw new TypeError('Classes extending YamakazeInteraction must have a getter "description"');
        if (this.permissions === undefined) throw new TypeError('Classes extending YamakazeInteraction must have a getter "permission"');
        if (this.options === undefined) throw new TypeError('Classes extending YamakazeInteraction must have a getter "options"');
        if (this.run === undefined) throw new TypeError('Classes extending YamakazeInteraction must implement an async function "run"');
        if (this.run.constructor.name !== 'AsyncFunction') throw new TypeError('Classes extending YamakazeInteraction must implement "run" as an async function');
    }
    get permissions() { 
        return null; 
    }
    get options() { 
        return null; 
    }
    get interactionData() {
        return { name: this.name, description: this.description, options: this.options };
    }
}
module.exports = YamakazeInteraction;