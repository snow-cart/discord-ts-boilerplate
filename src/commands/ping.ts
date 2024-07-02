import { ChatInputCommandInteraction, CacheType } from "discord.js";
import { CommandStruct, CommandOptStruct } from "./types";

const command = (interaction: ChatInputCommandInteraction<CacheType>) => {
	const text = interaction.options.get("text", false)?.value;
	interaction.reply(`Pong! ${text ? text : ""}`);
	return `Ping-Pong! ${text ? text : ""}`;
};

const json = new CommandStruct({
	name: "ping",
	description: "Replies with pong!",
	type: "CHAT_INPUT",
	options: [
		new CommandOptStruct({
			name: "text",
			description: "Some text which will be included with your ping!",
			type: "STRING",
		}),
	],
});

export default { command, json };
