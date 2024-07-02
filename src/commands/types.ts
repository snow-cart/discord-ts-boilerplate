import { Snowflake } from "discord.js";

/**
 * @param {string} name - Name of command
 * @param {string} description - Description of command
 * @param {"CHAT_INPUT" | "USER" | "MESSAGE"} type - Type of command, "CHAT_INPUT" on default
 * @param {Snowflake} guild_id - Guild ID if bot is exclusive to one guild
 * @param {commandOptStruct[]} options - Options of command
 * @param {("GUILD" | "BOT_DM" | "GROUP_DM")[]} contexts - List of contexts where command is available
 */
export class CommandStruct {
	constructor({ name, description, type = 1, contexts, ...rest }: CommandStruct) {
		this.name = name;
		this.description = description;
		this.type = commandTypeFactory(type);
		this.contexts = contextTypeFactory(contexts);
		Object.assign(this, rest);
	}
	name: string;
	description: string;
	type?: commandTypes;
	name_localizations?: Partial<Record<Locale, string>>;
	description_localizations?: Partial<Record<Locale, string>>;
	guild_id?: Snowflake;
	options?: CommandOptStruct[]; // Set of permissions represented as a bit set
	contexts?: contextTypes[];
	nsfw?: boolean;
	default_member_permissions?: string; //
}

type commandTypes =
	| 1 //"CHAT_INPUT"
	| "CHAT_INPUT"
	| 2 //"USER"
	| "USER"
	| 3 //"MESSAGE"
	| "MESSAGE";

type commandTypesInt = 1 | 2 | 3;

const commandTypeFactory = (i: commandTypes): commandTypesInt => {
	if (typeof i === "number") return i;
	switch (i) {
		case "CHAT_INPUT":
			return 1;
		case "USER":
			return 2;
		case "MESSAGE":
			return 3;
	}
};

type contextTypes =
	| 0 //"GUILD"
	| "GUILD"
	| 1 //"BOT_DM"
	| "BOT_DM"
	| 2 //"GROUP_DM"
	| "GROUP_DM"; // Also known as "PRIVATE_CHANNEL" in discord's docs

type contextTypesInt = 0 | 1 | 2;

const contextTypeFactory = (i: contextTypes[] | contextTypes | undefined): contextTypesInt[] | undefined => {
	if (typeof i === "undefined") return undefined;
	if (typeof i === "number") return [i];
	if (typeof i === "string") return [getInt(i)];
	let outputArr: channelTypesInt[] = [];
	for (let j = 0; j < i.length; j++) {
		outputArr.push(getInt(i[j]));
	}

	function getInt(val: contextTypes) {
		if (typeof val === "number") return val;
		switch (val) {
			case "GUILD":
				return 0;
			case "BOT_DM":
				return 1;
			case "GROUP_DM":
				return 2;
		}
	}
};

/**
 * @param {string} name - Name of command option
 * @param {string} description - Description of command option
 * @param {"SUB_COMMAND" | "SUB_COMMAND_GROUP" | "STRING" | "INTEGER" | "BOOLEAN" | "USER" | "CHANNEL" | "ROLE" | "MENTIONABLE" | "NUMBER" | "ATTACHMENT"} type - Type of option
 */
export class CommandOptStruct {
	constructor({ name, description, type, channel_types, ...rest }: CommandOptStruct) {
		this.name = name;
		this.description = description;
		this.type = commandOptTypeFactory(type);
		this.channel_types = channelTypeFactory(channel_types);
		Object.assign(this, rest);
	}
	name: string;
	description: string;
	type: commandOptTypes;
	required?: boolean;
	name_localizations?: Partial<Record<Locale, string>>;
	description_localizations?: Partial<Record<Locale, string>>;
	choices?: commandOptChoices[];
	channel_types?: channelTypes[];
	min_value?: number;
	max_value?: number;
	min_length?: number;
	max_length?: number;
	autocomplete?: boolean;
}

type commandOptTypes =
	| 1 //"SUB_COMMAND"
	| "SUB_COMMAND"
	| 2 //"SUB_COMMAND_GROUP"
	| "SUB_COMMAND_GROUP"
	| 3 //"STRING"
	| "STRING"
	| 4 //"INTEGER"
	| "INTEGER"
	| 5 //"BOOLEAN"
	| "BOOLEAN"
	| 6 //"USER"
	| "USER"
	| 7 //"CHANNEL"
	| "CHANNEL"
	| 8 //"ROLE"
	| "ROLE"
	| 9 //"MENTIONABLE"
	| "MENTIONABLE"
	| 10 //"NUMBER"
	| "NUMBER"
	| 11 //"ATTACHMENT"
	| "ATTACHMENT";

type commandOptTypesInt = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

const commandOptTypeFactory = (i: commandOptTypes): commandOptTypesInt => {
	if (typeof i === "number") return i;
	switch (i) {
		case "SUB_COMMAND":
			return 1;
		case "SUB_COMMAND_GROUP":
			return 2;
		case "STRING":
			return 3;
		case "INTEGER":
			return 4;
		case "BOOLEAN":
			return 5;
		case "USER":
			return 6;
		case "CHANNEL":
			return 7;
		case "ROLE":
			return 8;
		case "MENTIONABLE":
			return 9;
		case "NUMBER":
			return 10;
		case "ATTACHMENT":
			return 11;
	}
};

type commandOptChoices = {
	name: string;
	name_localizations: Partial<Record<Locale, string>>;
	value: string | number;
};

type channelTypes =
	| 0 //"GUILD_TEXT"
	| "GUILD_TEXT"
	| 1 //"DM"
	| "DM"
	| 2 //"GUILD_VOICE"
	| "GUILD_VOICE"
	| 3 //"GROUP_DM"
	| "GROUP_DM"
	| 4 //"GUILD_CATEGORY"
	| "GUILD_CATEGORY"
	| 5 //"GUILD_ANNOUNCEMENT"
	| "GUILD_ANNOUNCEMENT"
	| 10 //"ANNOUNCEMENT_THREAD"
	| "ANNOUNCEMENT_THREAD"
	| 11 //"PUBLIC_THREAD"
	| "PUBLIC_THREAD"
	| 12 //"PRIVATE_THREAD"
	| "PRIVATE_THREAD"
	| 13 //"GUILD_STAGE_VOICE"
	| "GUILD_STAGE_VOICE"
	| 14 //"GUILD_DIRECTORY"
	| "GUILD_DIRECTORY"
	| 15 //"GUILD_FORUM"
	| "GUILD_FORUM"
	| 16 //"GUILD_MEDIA"
	| "GUILD_MEDIA";

type channelTypesInt = 0 | 1 | 2 | 3 | 4 | 5 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

const channelTypeFactory = (i: channelTypes[] | channelTypes | undefined): channelTypesInt[] | undefined => {
	if (typeof i === "undefined") return undefined;
	if (typeof i === "number") return [i];
	if (typeof i === "string") return [getInt(i)];
	let outputArr: channelTypesInt[] = [];
	for (let j = 0; j < i.length; j++) {
		outputArr.push(getInt(i[j]));
	}

	function getInt(val: channelTypes): channelTypesInt {
		if (typeof val === "number") return val;
		switch (val) {
			case "GUILD_TEXT":
				return 0;
			case "DM":
				return 1;
			case "GUILD_VOICE":
				return 2;
			case "GROUP_DM":
				return 3;
			case "GUILD_CATEGORY":
				return 4;
			case "GUILD_ANNOUNCEMENT":
				return 5;
			case "ANNOUNCEMENT_THREAD":
				return 10;
			case "PUBLIC_THREAD":
				return 11;
			case "PRIVATE_THREAD":
				return 12;
			case "GUILD_STAGE_VOICE":
				return 13;
			case "GUILD_DIRECTORY":
				return 14;
			case "GUILD_FORUM":
				return 15;
			case "GUILD_MEDIA":
				return 16;
		}
	}
};

type Locale =
	| "id"
	| "da"
	| "de"
	| "en-GB"
	| "en-US"
	| "es-ES"
	| "es-419"
	| "fr"
	| "hr"
	| "it"
	| "lt"
	| "hu"
	| "nl"
	| "no"
	| "pl"
	| "pt-BR"
	| "ro"
	| "fi"
	| "sv-SE"
	| "vi"
	| "tr"
	| "cs"
	| "el"
	| "bg"
	| "ru"
	| "uk"
	| "hi"
	| "th"
	| "zh-CN"
	| "ja"
	| "zh-TW"
	| "ko";
