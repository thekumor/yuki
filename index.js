// ================================================
// 
//	Project: Yuki
//	Bot for Discord servers.
//	by The Kumor
// 
// ================================================

const { Client, Events, GatewayIntentBits, Collection, MessageFlags } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json');

// Create a bot.
const client = new Client({ intents: [GatewayIntentBits.Guilds]});
client.commands = new Collection();

// Load commands.
const foldersPath = path.join(__dirname, 'commands');
for (const folder of fs.readdirSync(foldersPath)){
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles){
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command){
			client.commands.set(command.data.name, command);
			console.log(`${filePath} loaded.`);
		}
		else{
			console.log(`${filePath} must have .data and .execute properties set.`);
		}
	}
}

client.once(Events.ClientReady, readyClient => {
	console.log('Bot logged!');
});

client.login(token);