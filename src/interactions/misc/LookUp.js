const { MessageEmbed } = require('discord.js');
const { ApplicationCommandOptionType } = require('discord-api-types/v10');
const YamakazeInteraction = require('../../abstract/YamakazeInteraction.js');
const axios = require('axios');

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
    await axios.get(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,currency,isp,org,as,reverse,mobile,query`)
        .then(respond => {
            var out = JSON.stringify(respond.data, null, 4);
            return out;
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
