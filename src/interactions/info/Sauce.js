const { MessageEmbed } = require('discord.js');
const { ApplicationCommandOptionType } = require('discord-api-types/v10');
const YamakazeInteraction = require('../../abstract/YamakazeInteraction.js');
const { sauceNaoApi } = require('../../../config.json');
const { SauceNao } = require('saucenao.js');
const sauce = new SauceNao({ api_key: sauceNaoApi });

class Sauce extends YamakazeInteraction {
    get name() {
        return 'sauce';
    }

    get description() {
        return 'Find picture from image link';
    }

    get options() {
        return [
            {
                name: 'url',
                type: ApplicationCommandOptionType.String,
                description: 'Put url here to find sauce with sauceao!',
                required: true
            },
            {
                name: 'resultnum',
                type: ApplicationCommandOptionType.String,
                description: 'Put number here to view other result!',
                required: false
            },
        ];
    }

    static async find(i, id) {
        const data = await sauce.find({ url: `${i}` });
        let u = data.results;
        const string = JSON.stringify(u, null, 2);
        const parseIndex = JSON.parse(string)[id];
        console.log(parseIndex);
        return parseIndex;
    }

    async run({ interaction }) {
        function isValidURL(url) {
            // Regular expression to match the URL pattern
            const urlPattern =
        /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/;

            // Test if the given string matches the pattern
            return urlPattern.test(url);
        }

        let url = interaction.options.getString('url'); // Get url
        let num = interaction.options.getString('resultnum');
        let defaultIndex = 0;
        const findd = await Sauce.find(url, num || defaultIndex);

        if (isValidURL(url)) {
            const embed = new MessageEmbed()
                .setColor(this.client.color)
                .setTitle(`Is this for you looking for? Vaild: ${isValidURL(url)}`)
                .setDescription(
                    `Result ${num || defaultIndex}:
Index name: ${findd.header.index_name}
Similarity: ${findd.header.similarity}%
Possibility Sauce: ${findd.data.source || findd.data.title}

Url: ${findd.data.ext_urls}
`
                )
                .setImage(findd.header.thumbnail);

            // Create the initial message with the first result
            // eslint-disable-next-line no-unused-vars
            let message = await interaction.reply({
                embeds: [embed],
            });
        } else {
            const embed = new MessageEmbed()
                .setColor(this.client.color)
                .setTitle('That not a valid url :(')
                .setThumbnail(
                    'https://lastfm.freetls.fastly.net/i/u/300x300/66fb1457a2b95d5d0ba91c6b7a834e89.gif'
                );
                // Create the initial message with the first result
            return interaction.reply({
                embeds: [embed],
            });
        }
    }
}
module.exports = Sauce;
