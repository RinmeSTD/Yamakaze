import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/v10";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandOptions, Interaction } from "../../structure/Interaction.js";
import { Yamakaze } from "../../Yamakaze.js";
import { InteractionContext } from "../../structure/InteractionContext.js";

export const CommandData = new SlashCommandBuilder()
    .setName("about")
    .setDescription(
        "Shows some misc info about me and how to host your own instance"
    )
    .toJSON();

export default class About extends Interaction {
    public readonly commandData: RESTPostAPIChatInputApplicationCommandsJSONBody;
    public readonly commandOptions: CommandOptions;
    constructor(client: Yamakaze, directory: string) {
        super(client, directory);
        this.commandData = CommandData;
        this.commandOptions = {};
    }

    async run(context: InteractionContext): Promise<void> {
        const embed = new EmbedBuilder()
            .setTitle("About me")
            .setURL("https://github.com/RinmeSTD/Yamakaze")
            .setThumbnail(this.client.user!.displayAvatarURL())
            .setDescription(
                "A bot that showcases how `@sayanyan (325231623262044162)` implements [Shoukaku](https://github.com/RinmeSTD/Shoukaku) and [Indomitable](https://github.com/RinmeSTD/Indomitable) on his bots. You can get your own copy to self host at [Yamakaze](https://github.com/RinmeSTD/Yamakaze)"
            );
        await context.sendInteraction({ embeds: [embed] });
    }
}
