const { MessageEmbed } = require('discord.js');
const { ApplicationCommandOptionType } = require('discord-api-types/v10');
const YamakazeInteraction = require('../../abstract/YamakazeInteraction.js');

class Help extends YamakazeInteraction {
    get name() {
        return 'help';
    }

    get description() {
        return 'Want to see my commands and how to use them?';
    }

    get options() {
        return [{
            name: 'command',
            type: ApplicationCommandOptionType.String,
            description: 'Specific command help'
        }];
    }

    static invite(id) {
        return `https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=139623484672&scope=bot%20applications.commands`;
    }

    async run({ interaction }) {
        let command = interaction.options.getString('command');
        if (!command) {
            const embed = new MessageEmbed()
                .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
                .setTitle('• Help Menu')
                .setColor(this.client.color)
                .setDescription('Do /help [command] for a detailed help about that command')
                // .addField('<:Yamakaze_desu:545882696048443392> Info', this.client.interactions.commands.filter(cmd => cmd.category === 'Info').map(cmd => `/${cmd.name}`).join(', '))
                .addField('emojihere Info', this.client.interactions.commands.filter(cmd => cmd.category === 'Info').map(cmd => `/${cmd.name}`).join(', '))
                .addField('emojihere Music', this.client.interactions.commands.filter(cmd => cmd.category === 'Music').map(cmd => `/${cmd.name}`).join(', '))
                .addField('emojihere Links', `[Source](https://github.com/RinmeSTD/Yamakaze) | [OG](https://github.com/Deivu) | [Developer](https://github.com/rinme) | [Invite](${Help.invite(this.client.user.id)}) | [Support](https://discord.gg/FVqbtGu)`)
                .setFooter(`The Shipgirl Project • ${this.client.interactions.commands.size} commands loaded`);
            return interaction.reply({ embeds: [ embed ] });
        }
        command = this.client.interactions.commands.get(command);
        if (!command) 
            return interaction.reply('Teitoku, this command you specified don\'t exist');
        const embed = new MessageEmbed()
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
            .setTitle(`/${command.name}`)
            .setColor(this.client.color)
            .setDescription(command.description)
            .setFooter(`The Shipgirl Project • ${this.client.interactions.commands.size} commands loaded`);
        if (command.options?.length) {
            for (const option of command.options)
                embed.addField(`/${command.name} ${option.name}`, option.description);
        }
        return interaction.reply({ embeds: [ embed ] });
    }
}
module.exports = Help;