const { MessageEmbed } = require('discord.js');
const { ApplicationCommandOptionType } = require('discord-api-types/v10');
const YamakazeInteraction = require('../../abstract/YamakazeInteraction.js');
const axios = require('axios');

class Bypass extends YamakazeInteraction {
    get name() {
        return 'bypass';
    }

    get description() {
        return 'Bypass the url this was made for linkvertise!';
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

        function isValidURL(url) {
            // Regular expression to match the URL pattern
            const urlPattern = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/;

            // Test if the given string matches the pattern
            return urlPattern.test(url);
        }

        if (!url) {
            const embed = new MessageEmbed()
                .setColor(this.client.color)
                .setTitle('No url')
                .setDescription(
                    `\`\`\`ml\n
Please put the url :(\`\`\``
                )
                .setTimestamp()
                .setFooter(
                    this.client.user.username,
                    this.client.user.displayAvatarURL()
                );
            return interaction.reply({ embeds: [embed] });
        } else {
            if (isValidURL(url)) {

                const embed = new MessageEmbed()
                    .setColor(this.client.color)
                    .setTitle('Destination founded')
                    .setDescription(
                        `\`\`\`ml\n
${await axios.get(`https://bypass.pm/bypass2?url=${url}`)
        .then(respond => {
            return respond.data.destination;
        })
}\`\`\``)
                    .setTimestamp()
                    .setFooter(
                        this.client.user.username,
                        this.client.user.displayAvatarURL()
                    );
                return interaction.reply({ embeds: [embed] });
            } else {
                const embed = new MessageEmbed()
                    .setColor(this.client.color)
                    .setTitle('That not a valid url :(')
                    .setThumbnail('https://lastfm.freetls.fastly.net/i/u/300x300/66fb1457a2b95d5d0ba91c6b7a834e89.gif');
                // Create the initial message with the first result
                return interaction.reply({
                    embeds: [embed]
                });
            }
        }
    }
}
module.exports = Bypass;
