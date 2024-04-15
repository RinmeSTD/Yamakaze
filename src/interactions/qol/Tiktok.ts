import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/v10";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandOptions, Interaction } from "../../structure/Interaction.js";
import { Yamakaze } from "../../Yamakaze.js";
import { InteractionContext } from "../../structure/InteractionContext.js";
import Tiktok from "@tobyg74/tiktok-api-dl";

export const CommandData = new SlashCommandBuilder()
    .setName("tiktok")
    .setDescription("Download the video from tiktok")
    .addStringOption((option) =>
        option
            .setName('url')
            .setDescription('The url of tiktok video')
            .setRequired(true)
    )
    .toJSON();

export default class Tiktokd extends Interaction {
    public readonly commandData: RESTPostAPIChatInputApplicationCommandsJSONBody;
    public readonly commandOptions: CommandOptions;
    constructor(client: Yamakaze, directory: string) {
        super(client, directory);
        this.commandData = CommandData;
        this.commandOptions = {};
    }


    async run(context: InteractionContext): Promise<void> {
        // Target
        let url = context.interaction.options.getString("url")!;

        const ping = Math.round(context.interaction.guild!.shard.ping);
        const result = await Tiktok.Downloader(url, { version: "v2" });
        // Check if result is defined and has the expected structure
        if (result && result.result && result.result.video && result.result.music && result.result.author && result.result.author.avatar && result.result.desc) {
            // Extract data from the result
            const { video, music, desc } = result.result;
            const { avatar } = result.result.author;

            // Buttons
            const videos = new ButtonBuilder()
                .setLabel('Download Video')
                .setURL(`${video}`)
                .setStyle(ButtonStyle.Link);

            const audios = new ButtonBuilder()
                .setLabel('Download Music')
                .setURL(`${music}`)
                .setStyle(ButtonStyle.Link);

            const row = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(videos, audios)

            //Embed
            const embed = new EmbedBuilder()
                .setTitle(desc)
                .setThumbnail(avatar)
                .setFooter({ text: `Respond within ${ping}ms` })
                .setTimestamp()

            await context.sendInteraction({ embeds: [embed], components: [row] });
        } else {
            // Handle case where result is not as expected
            await context.sendInteraction({ content: "Failed to retrieve TikTok video information.", ephemeral: true });
        }
    }
}