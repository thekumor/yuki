// ================================================
// 
//	Project: Yuki
//
//	File: commands/register/register.js
//	Desc: Registers a user so they could use RPG
//	elements of this bot.
// 
//	Modified: 2025/12/27 3:06 PM
//	Created: 2025/12/27 1:27 PM
//	Authors: The Kumor
// 
// ================================================

const { SlashCommandBuilder } = require('discord.js');
var yukidb = require('../../database.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registers a user.'),

	async execute(interaction) {
		await yukidb.RegisterUser(interaction.guild.id, interaction.user);
		await interaction.reply('You have been registered.');
	}
};
