const YamakazeEvent = require('../abstract/YamakazeEvent.js');


class GuildDelete extends YamakazeEvent {
    get name() {
        return 'guildDelete';
    }

    get once() {
        return false;
    }

    async run(guild) {
        if (!guild.available) return;
        this.client.logger.log(this.constructor.name, `Removed guild => ${guild.name} with ${guild.memberCount} members`);
    }
}
module.exports = GuildDelete;
