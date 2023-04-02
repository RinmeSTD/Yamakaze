const { MessageEmbed } = require('discord.js');
const { ApplicationCommandOptionType } = require('discord-api-types/v10');
const YamakazeInteraction = require('../../abstract/YamakazeInteraction.js');
const { IPinfoWrapper, LruCache } = require('node-ipinfo');
const { ipInfoApi } = require('../../../config.json');

const cacheOptions = {
    max: 5000,
    maxAge: 24 * 1000 * 60 * 60,
};
const cache = new LruCache(cacheOptions);
const ipinfo = new IPinfoWrapper(ipInfoApi, cache);
class LookUp extends YamakazeInteraction {
    get name() {
        return 'lookup';
    }

    get description() {
        return 'Look up people\'s ip!';
    }

    get options() {
        return [
            {
                name: 'ip',
                type: ApplicationCommandOptionType.String,
                description: 'Put ip address here to look up!',
            },
        ];
    }

    async run({ interaction }) {
        let ip = interaction.options.getString('ip');

        function isValidIPAddress(ip) {
            // Regular expression to match the IP address pattern
            const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;

            // Test if the given string matches the pattern
            if (!ipPattern.test(ip)) {
                return false;
            }

            // Split the IP address into its individual parts
            const parts = ip.split('.');

            // Check if each part is a number between 0 and 255
            for (let i = 0; i < parts.length; i++) {
                const part = parseInt(parts[i]);
                if (isNaN(part) || part < 0 || part > 255) {
                    return false;
                }
            }

            // All checks pass, so the IP address is valid
            return true;
        }


        if (!ip) {
            const embed = new MessageEmbed()
                .setColor(this.client.color)
                .setTitle('No IP')
                .setDescription(
                    `\`\`\`ml\n
Please put the IP address :(\`\`\``
                )
                .setTimestamp()
                .setFooter(
                    this.client.user.username,
                    this.client.user.displayAvatarURL()
                );
            return interaction.reply({ embeds: [embed] });
        } else {
            if (isValidIPAddress(ip)) {

                const embed = new MessageEmbed()
                    .setColor(this.client.color)
                    .setTitle('We got them')
                    .setDescription(
                        `\`\`\`ml\n
${await ipinfo.lookupIp(ip).then((response) => {

        return (
            `IP            ::      ${response.ip}
Hostname      ::      ${response.hostname}
City          ::      ${response.city}
Region        ::      ${response.region}
Country       ::      ${response.country}
Location      ::      ${response.loc}
Postal        ::      ${response.postal}
Organization  ::      ${response.org}
Timezone      ::      ${response.timezone}`
        );
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
module.exports = LookUp;
