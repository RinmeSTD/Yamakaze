const { MessageEmbed } = require('discord.js');
const YamakazeInteraction = require('../../abstract/YamakazeInteraction.js');
const { shardCount, clusterCount } = require('../../../config.json');

class Stats extends YamakazeInteraction {
    get name() {
        return 'stats';
    }

    get description() {
        return 'My current info!';
    }

    static convertBytes(bytes) {
        const MB = Math.floor(bytes / 1024 / 1024 % 1000);
        const GB = Math.floor(bytes / 1024 / 1024 / 1024);
        if (MB >= 1000)
            return `${GB.toFixed(1)} GB`;
        else
            return `${Math.round(MB)} MB`;
    }

    static uptimeConvert(uptime) {

        const hrs = ~~(uptime / 3600);
        const mins = ~~((uptime % 3600) / 60);
        const secs = ~~uptime % 60;

        let ret = '';

        if (hrs > 0) {
            ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
        }

        ret += '' + mins + ':' + (secs < 10 ? '0' : '');
        ret += '' + secs;

        return ret;
    }


    async run({ interaction }) {
        const [guilds, channels, memory, players] = await Promise.all([
            this.client.shard.broadcastEval(client => client.guilds.cache.size),
            this.client.shard.broadcastEval(client => client.channels.cache.size),
            this.client.shard.broadcastEval(() => process.memoryUsage()),
            this.client.shard.broadcastEval(client => client.queue.size)
        ]);
        const embed = new MessageEmbed()
            .setColor(this.client.color)
            .setTitle('Status')
            .setDescription(`\`\`\`ml\n
Uptime        :: ${Stats.uptimeConvert(process.uptime())}

Guilds        :: ${guilds.reduce((sum, count) => sum + count)}
Channels      :: ${channels.reduce((sum, count) => sum + count)}
Players       :: ${players.reduce((sum, count) => sum + count)}

TotalClusters :: ${clusterCount}
TotalShards   :: ${shardCount}
Memory        :: ${Stats.convertBytes(memory.reduce((sum, memory) => sum + memory.rss, 0))}\`\`\``)
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL());
        await interaction.reply({ embeds: [embed] });
    }
}
module.exports = Stats;