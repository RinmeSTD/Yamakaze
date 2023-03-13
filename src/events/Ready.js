const YamakazeEvent = require('../abstract/YamakazeEvent.js');
const { shardCount, clusterCount } = require('../../config.json');
class Ready extends YamakazeEvent {
    get name() {
        return 'ready';
    }

    get once() {
        return true;
    }

    static convertBytes(bytes) {
        const MB = Math.floor(bytes / 1024 / 1024 % 1000);
        const GB = Math.floor(bytes / 1024 / 1024 / 1024);
        if (MB >= 1000)
            return `${GB.toFixed(1)} GB`;
        else
            return `${Math.round(MB)} MB`;
    }

    async run() {
        this.client.logger.debug(`${this.client.user.username}`, `Ready! Serving ${this.client.guilds.cache.size} guild(s) with ${this.client.users.cache.size} user(s)`);
        const [guilds, channels, memory] = await Promise.all([
            this.client.shard.broadcastEval(client => client.guilds.cache.size),
            this.client.shard.broadcastEval(client => client.channels.cache.size),
            this.client.shard.broadcastEval(() => process.memoryUsage()),
        ]);
        const statuses = [
            { type: 'LISTENING', message: `私は ${guilds.reduce((sum, count) => sum + count)}ギルド と ${channels.reduce((sum, count) => sum + count)}チャネル` },
            { type: 'PLAYING', message: '横に行って…いい？' },
            { type: 'LISTENING', message: `${Ready.convertBytes(memory.reduce((sum, memory) => sum + memory.rss, 0))}以内にシャード ${shardCount} つ、クラスタ ${clusterCount} つ` },
            { type: 'PLAYING', message: '両舷いっぱい！行け！' },
            { type: 'LISTENING', message: 'どうしたの？疲れたの？そっか。お茶でも、飲む？入れようっか。いや、あたしも飲みたいから。別に、気にしないで。待ってて。' },
        ];
        let i = 0;
        this.interval = setInterval(() => {
            if (i > statuses.length - 1) i = 0;
            this.client.user.setActivity(`${statuses[i].message}`, { type: `${statuses[i].type}` });
            i++;
        }, 60000);

    }
}
module.exports = Ready;
