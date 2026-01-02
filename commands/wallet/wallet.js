// ================================================
// 
//	Project: Yuki
//
//	File: commands/wallet/wallet.js
//	Desc: Retrieves user's money from database.
// 
//	Modified: 2026/01/02 7:22 PM
//	Created: 2026/01/02 7:16 PM
//	Authors: The Kumor
// 
// ================================================

const { SlashCommandBuilder } = require('discord.js');
const { database, guildID } = require('../../config.json');
const yukidb = require('../../database.js');

module.exports = {
	data: new SlashCommandBuilder().setName('wallet').setDescription('Retrieves amount of money that you have.'),
	async execute(interaction){
		const money = await yukidb.Get(interaction.guild.id, interaction.user.id, 'economy', 'money');
		
		const serverName = guildID[interaction.guild.id];
		const currency = database.settings[serverName].currency;

		await interaction.reply('Your money: ' + money + ' ' + currency);
	}
};