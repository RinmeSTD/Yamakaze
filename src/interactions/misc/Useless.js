const YamakazeInteraction = require('../../abstract/YamakazeInteraction.js');

class Useless extends YamakazeInteraction {
    get name() {
        return 'useless';
    }

    get description() {
        return 'most useless command ever exist!';
    }

    static getRandomIntInclusive(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        let o = Math.floor(Math.random() * (max - min + 1) + min);
        return o;
    }

    async run({ interaction }) {
        const maththing = ['+', '-', '×', '÷'];

        const random = Math.floor(Math.random() * maththing.length);
        await interaction.deferReply({ fetchReply: true });
        await interaction.editReply(`${Useless.getRandomIntInclusive(0, 1234567890)} ${random, maththing[random]} ${Useless.getRandomIntInclusive(0, 1234567890)} = ${Useless.getRandomIntInclusive(0, 123456789012345)}`);
    }
}
module.exports = Useless;