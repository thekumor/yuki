// ================================================
// 
//	Project: Yuki
//
//	File: commands/ping/ping.js
//	Desc: Simple command for testing the bot.
// 
//	Modified: 2025/09/21 10:03 AM
//	Created: 2025/09/21 10:03 AM
//	Authors: The Kumor
// 
// ================================================

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Pings this bot.'),
	async execute(interaction){
		await interaction.reply('Hi 💖');
	}
};