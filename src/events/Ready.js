const YamakazeEvent = require('../abstract/YamakazeEvent.js');

class Ready extends YamakazeEvent {
    get name() {
        return 'ready';
    }

    get once() {
        return true;
    }

    async run() {
        this.client.logger.debug(`${this.client.user.username}`, `Ready! Serving ${this.client.guilds.cache.size} guild(s) with ${this.client.users.cache.size} user(s)`);
        const statuses = [
            {type : 'PLAYING', message: '横に行って…いい？'},
            {type: 'LISTENING' , message: 'どうしたの？疲れたの？そっか。お茶でも、飲む？入れようっか。いや、あたしも飲みたいから。別に、気にしないで。待ってて。'},
            {type: 'PLAYING' , message: '両舷いっぱい！行け！'},
        ];
        let i = 0;
        this.interval = setInterval(() => {
            if(i > statuses.length -1 ) i = 0;
            this.client.user.setActivity(`${statuses[i].message}`, {type : `${statuses[i].type}`});
            i++;
        }, 300000);
    
    }
}
module.exports = Ready;
