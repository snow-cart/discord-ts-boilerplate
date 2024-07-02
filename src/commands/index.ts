import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { CommandStruct } from "./types";

// import example from "./example";
import ping from "./ping";

export default (commandName: string, interaction: ChatInputCommandInteraction<CacheType>): string | void => {
	switch (commandName) {
		// case "example" :
		// 	return example.command(interaction);
		case "ping":
			return ping.command(interaction);
	}
};

export const commandsJson: CommandStruct[] = [
	// example.json,
	ping.json,
];
