// ================================================
// 
//	Project: Yuki
//
//	File: commands/stats/stats.js
//	Desc: Shows user his stats.
// 
//	Modified: 2026/01/18 11:46 AM
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
		const guildID = interaction.guild.id;
		const user = interaction.user;

		// Messages sent, etc
		const stats = await yukidb.GetAll(guildID, user, 'stats');

		// Health, attack, etc
		const rpg = await yukidb.GetAll(guildID, user, 'rpg');

		await interaction.reply({ content: 'Messages sent: ' + stats.messages_sent + '\nReactions added: ' + stats.reactions_added
						+ '\n\nLevel: ' + rpg.level + '\nHealth: ' + rpg.health + '\nExperience: ' + rpg.experience + '\nAttack: ' + rpg.attack
						+ '\nDefence: ' + rpg.defense + '\nMagic: ' + rpg.magic + '\nLuck: ' + rpg.luck,
					ephemeral: true });
	}
};
