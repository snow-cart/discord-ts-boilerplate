import { REST, Routes } from "discord.js";

import "dotenv/config";
const DISCORD_TOKEN = process.env.DISCORD_TOKEN as string;
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID as string;

import { commandsJson } from "./commands";

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

rest
	.put(Routes.applicationCommands(DISCORD_CLIENT_ID), { body: commandsJson })
	.then(() => console.log("Sent commands to Discord"));
