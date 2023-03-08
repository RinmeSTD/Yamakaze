const YamakazeInteraction = require('../../abstract/YamakazeInteraction.js');

class Useless extends YamakazeInteraction {
    get name() {
        return 'useless';
    }

    get description() {
        return 'most useless command ever exist!';
    }

    async run({ interaction }) {
        const message = await interaction.deferReply({ fetchReply: true });
        await interaction.editReply(`1+1 = ${1 + 1}`);
    }
}
module.exports = Useless;