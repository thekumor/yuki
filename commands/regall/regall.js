// ================================================
// 
//	Project: Yuki
//
//	File: commands/regall/regall.js
//	Desc: Registers all users into the database.
// 
//	Modified: 2026/01/10 12:35 PM
//	Created: 2026/01/10 12:33 PM
//	Authors: The Kumor
// 
// ================================================

const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { database, guildID } = require('../../config.json');
const yukidb = require('../../database.js');

module.exports = {
	data: new SlashCommandBuilder().setName('regall').setDescription('Registers all users into the database.'),
	async execute(interaction){
		if (interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator) === false) {
			await interaction.reply({ content: 'You need to be an administrator to use this command.', ephemeral: true });
			return;
		}

		await interaction.guild.members.fetch();
		
		for (const member of interaction.guild.members.cache.values()){
			if (member.user.bot) continue;

			await yukidb.RegisterUser(member.guild.id, member.user);
		}

		await interaction.reply({ content: 'Everyone is registered now.', ephemeral: true });
	}
};