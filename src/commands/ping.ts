import { ChatInputCommandInteraction, CacheType } from "discord.js";

const command = (interaction: ChatInputCommandInteraction<CacheType>) => {
	interaction.reply("Pong!");
};

const json = {
	name: "ping",
	description: "Replies with pong!",
};

export default { command, json };
