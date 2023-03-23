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

            const embed = new MessageEmbed()
                .setColor(this.client.color)
                .setTitle('We got them')
                .setDescription(
                    `\`\`\`ml\n
${
    await ipinfo.lookupIp(ip).then((response) => {

        return(
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
        }
    }
}
module.exports = LookUp;
