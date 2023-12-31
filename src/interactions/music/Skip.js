const YamakazeInteraction = require('../../abstract/YamakazeInteraction.js');

class Skip extends YamakazeInteraction {
    get name() {
        return 'skip';
    }

    get description() {
        return 'Skips the currently playing song';
    }

    get playerCheck() {
        return { voice: true, dispatcher: true, channel: true };
    }

    async run({ interaction, dispatcher }) {
        await interaction.reply('Skipping the currently playing track!');
        dispatcher.player.stopTrack();
    }
}
module.exports = Skip;