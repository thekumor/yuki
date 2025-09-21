const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Pings this bot.'),
	async execute(interaction){
		await interaction.reply('Hi 💖');
	}
};