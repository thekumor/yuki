#!/usr/bin/env node
// ================================================
//
//	Project: Yuki
//	Description: Bot for Discord servers.
//
//	Authors: The Kumor
//
// ================================================

const { REST, Routes, Client, Events, GatewayIntentBits, Collection, MessageFlags } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { token, clientID, guildID } = require('./config.json');

// Create a bot.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commands = [];

// Load commands.
const foldersPath = path.join(__dirname, 'commands');
for (const folder of fs.readdirSync(foldersPath)) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			commands.push(command.data.toJSON());
			console.log(`${filePath} loaded.`);
		}
		else {
			console.log(`${filePath} must have .data and .execute properties set.`);
		}
	}
}

const rest = new REST().setToken(token);

for (var server in guildID) {
	console.log('Server \'' + server + '\' (' + guildID[server] + ') found.');
	
	(async () => {
		try {
			const data = await rest.put(
				Routes.applicationGuildCommands(clientID, guildID[server]),
				{ body: commands },
			);
		}
		catch (error) {
			console.error(error);
		}
	})();
}

client.once(Events.ClientReady, readyClient => {
	console.log('Bot logged!');
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`${interaction.commandName} command doesn't exist!`);
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred)
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		else
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
	}
});

client.login(token);
