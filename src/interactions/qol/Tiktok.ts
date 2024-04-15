import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/v10";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandOptions, Interaction } from "../../structure/Interaction.js";
import { Yamakaze } from "../../Yamakaze.js";
import { InteractionContext } from "../../structure/InteractionContext.js";

export const CommandData = new SlashCommandBuilder()
    .setName("tiktok")
    .setDescription("Download the video from tiktok")
    .addStringOption(option =>
        option
            .setName('URL')
            .setDescription('The url of tiktok video')
    )
    .toJSON();

export default class Tiktok extends Interaction {
    public readonly commandData: RESTPostAPIChatInputApplicationCommandsJSONBody;
    public readonly commandOptions: CommandOptions;
    constructor(client: Yamakaze, directory: string) {
        super(client, directory);
        this.commandData = CommandData;
        this.commandOptions = {};
    }

    async run(context: InteractionContext): Promise<void> {
        // Target
        let url = context.interaction.options.getString("URL")!;

        const ping = Math.round(context.interaction.guild!.shard.ping);

        // Get 
        const uID = await context.interaction.guild?.members.fetch(target.id);
        const uIcon = target.displayAvatarURL();

        //Embed
        const embed = new EmbedBuilder()
            .setTitle(target.displayName)
            .setThumbnail(uIcon)
            .addFields({ name: "Member", value: `${target}`, inline: false })
            .addFields({ name: "Roles", value: `${uID?.roles.cache.map(r => r).join(' \n')}`, inline: false })
            .addFields({ name: "Joined Server", value: `${uID?.joinedAt}`, inline: false })
            .addFields({ name: "Joined Discord", value: `${context.interaction.options.getUser("target")?.createdAt}`, inline: false })
            .addFields({ name: "User ID", value: `${target.id}`, inline: false })
            .setFooter({ text: `Respond within ${ping}ms` })
            .setTimestamp()

        await context.sendInteraction({ embeds: [embed] });
    }
}
