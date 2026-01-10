// ================================================
// 
//	Project: Yuki
//
//	File: commands/stats/stats.js
//	Desc: Shows user his stats.
// 
//	Modified: 2026/01/10 12:59 PM
//	Created: 2026/01/10 12:59 PM
//	Authors: The Kumor
// 
// ================================================

const { SlashCommandBuilder } = require('discord.js');
const yukidb = require('../../database.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('stats')
	.setDescription('Shows user his stats.'),

	async execute(interaction){
		const messagesSent = await yukidb.Get(interaction.guild.id, interaction.user, 'stats', 'messages_sent');
		const reactionsAdded = await yukidb.Get(interaction.guild.id, interaction.user, 'stats', 'reactions_added');

		await interaction.reply({ content: 'Messages sent: ' + messagesSent + '\nReactions added: ' + reactionsAdded, ephemeral: true });
	}
};
