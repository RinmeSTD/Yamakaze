const { MessageEmbed } = require('discord.js');
const { ApplicationCommandOptionType } = require('discord-api-types/v10');
const YamakazeInteraction = require('../../abstract/YamakazeInteraction.js');
const axios = require('axios');

class Link extends YamakazeInteraction {
    get name() {
        return 'link';
    }

    get description() {
        return 'Bypass the link this was made for linkvertise!';
    }

    get options() {
        return [
            {
                name: 'url',
                type: ApplicationCommandOptionType.String,
                description: 'Put url here to bypass!',
            },
        ];
    }

    async run({ interaction }) {
        let url = interaction.options.getString('url');
        if (!url) {
            const embed = new MessageEmbed()
                .setColor(this.client.color)
                .setTitle('No url')
                .setDescription(
                    `\`\`\`ml\n
Please put the link :(\`\`\``
                )
                .setTimestamp()
                .setFooter(
                    this.client.user.username,
                    this.client.user.displayAvatarURL()
                );
            return interaction.reply({ embeds: [embed] });
        } else {

            const embed = new MessageEmbed()
                .setColor(this.client.color)
                .setTitle('Link founded')
                .setDescription(
                    `\`\`\`ml\n
Input  ::    ${url}
Output ::    ${
    await axios.get(`https://bypass.pm/bypass2?url=${url}`)
        .then(respond => {
            return(respond.data.destination);
        })
}\`\`\``)
                .setTimestamp()
                .setFooter(
                    this.client.user.username,
                    this.client.user.displayAvatarURL()
                );
            return interaction.reply({ embeds: [embed] });
        }
    }
}
module.exports = Link;
