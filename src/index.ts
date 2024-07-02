import { Client, GatewayIntentBits } from "discord.js";

import "dotenv/config";
const DISCORD_TOKEN = process.env.DISCORD_TOKEN as string;
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID as string;

import commands from "./commands";

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

discordClient.on("ready", () => {
	console.log(`Logged in as ${discordClient.user?.tag}!`);
});

discordClient.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const consoleOutput = commands(interaction.commandName, interaction);
	consoleOutput && console.log(consoleOutput);
});

discordClient.login(DISCORD_TOKEN);
