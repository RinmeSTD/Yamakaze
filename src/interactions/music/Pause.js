
const YamakazeInteraction = require('../../abstract/YamakazeInteraction.js');

class Pause extends YamakazeInteraction {
    get name() {
        return 'pause';
    }

    get description() {
        return 'Pauses the current playback!';
    }

    get playerCheck() {
        return { voice: true, dispatcher: true, channel: true };
    }

    async run({ interaction, dispatcher }) {
        dispatcher.player.setPaused(true);
        await interaction.reply('Teitoku, I paused the playback in this guild!');
    }
}
module.exports = Pause;