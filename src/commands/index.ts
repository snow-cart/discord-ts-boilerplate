import { CacheType, ChatInputCommandInteraction } from "discord.js";

// import example from "./example";
import ping from "./ping";

export default (commandName: string, interaction: ChatInputCommandInteraction<CacheType>) => {
	switch (commandName) {
		// case "example" :
		// 	example.command(interaction);
		// 	break;
		case "ping":
			ping.command(interaction);
			break;
	}
};

export const commandsJson = [
	// example.json,
	ping.json,
];
